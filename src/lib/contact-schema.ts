import { z } from "zod";

// Shared by the client form and the server action, so both validate identically.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "That name is a bit long."),
  email: z.email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(5000, "Please keep it under 5,000 characters."),
});

export type ContactFields = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactFields, string>>;
  values?: Partial<ContactFields>;
};

export function fieldErrors(error: z.ZodError<ContactFields>) {
  const flat = z.flattenError(error).fieldErrors;
  return {
    name: flat.name?.[0],
    email: flat.email?.[0],
    message: flat.message?.[0],
  };
}
