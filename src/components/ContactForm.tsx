"use client";

import { useActionState, useState, type FormEvent } from "react";
import { sendContact } from "@/app/actions";
import { contactSchema, fieldErrors, type ContactState } from "@/lib/contact-schema";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message", type: "textarea", autoComplete: "off" },
] as const;

const inputClass =
  "w-full border-2 border-ink bg-paper px-3 py-2.5 text-ink placeholder:text-muted aria-invalid:border-tomato aria-invalid:border-[3px]";

export default function ContactForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<ContactState["errors"]>();
  const errors = clientErrors ?? state.errors;

  function validate(e: FormEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      e.preventDefault();
      const errs = fieldErrors(parsed.error);
      setClientErrors(errs);
      const first = fields.find((f) => errs[f.name]);
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
    } else {
      setClientErrors(undefined);
    }
  }

  return (
    <form action={action} onSubmit={validate} noValidate className="grid gap-5">
      {fields.map((f) => {
        const error = errors?.[f.name];
        const props = {
          id: `contact-${f.name}`,
          name: f.name,
          autoComplete: f.autoComplete,
          required: true,
          defaultValue: state.status === "success" ? "" : state.values?.[f.name],
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `contact-${f.name}-error` : undefined,
          className: inputClass,
        };
        return (
          <div key={f.name} className="grid gap-1.5">
            <label htmlFor={props.id} className="font-semibold">
              {f.label}
            </label>
            {f.type === "textarea" ? <textarea rows={5} {...props} /> : <input type={f.type} {...props} />}
            {error && (
              <p id={`contact-${f.name}-error`} className="font-semibold text-tomato">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="border-2 border-ink bg-ink px-6 py-3 font-display text-lg font-bold text-paper shadow-block-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-muted">
          Or email <a className="font-semibold text-ink underline underline-offset-4" href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div aria-live="polite" role="status">
        {!clientErrors && state.status !== "idle" && (
          <p
            className={`border-2 border-ink p-4 font-semibold ${
              state.status === "success" ? "bg-sun text-on-sun" : "bg-tomato text-on-tomato"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
