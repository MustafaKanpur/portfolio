"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, fieldErrors, type ContactState } from "@/lib/contact-schema";

// ponytail: in-memory limiter, per server instance. On Vercel it's a speed bump, not a wall;
// move to Upstash Redis (@upstash/ratelimit) if spam gets through.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  hits.set(ip, [...recent, now]);
  return false;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: humans never see this field. Bots that fill it get a fake success.
  if (formData.get("company")) return { status: "success", message: "Thanks! Your message is on its way." };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error), values };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many messages. Please try again in a few minutes.", values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { status: "error", message: "The contact form isn't set up yet. Please email me directly.", values };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { status: "error", message: "Something went wrong sending your message. Please email me directly.", values };
  }
  return { status: "success", message: "Thanks! Your message is on its way. I'll reply soon." };
}
