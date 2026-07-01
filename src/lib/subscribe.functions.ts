import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Nieprawidłowy adres e-mail" })
    .max(255, { message: "E-mail jest za długi" }),
  gdpr_contact: z.literal(true, {
    errorMap: () => ({ message: "Zgoda GDPR jest wymagana" }),
  }),
  gdpr_newsletter: z.boolean(),
});

export type SubscribeResult =
  | { ok: true }
  | { ok: false; code: "duplicate" | "invalid" | "network"; message: string };

export const subscribe = createServerFn({ method: "POST" })
  .validator((data: unknown) => subscribeSchema.parse(data))
  .handler(async ({ data }): Promise<SubscribeResult> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin.from("subscribers").insert({
      email: data.email,
      gdpr_contact: data.gdpr_contact,
      gdpr_newsletter: data.gdpr_newsletter,
    });

    if (error) {
      // Postgres unique_violation
      if ((error as { code?: string }).code === "23505") {
        return {
          ok: false,
          code: "duplicate",
          message: "Już jesteś na liście!",
        };
      }
      console.error("[subscribe] insert error", error);
      return {
        ok: false,
        code: "network",
        message: "Coś poszło nie tak. Spróbuj ponownie.",
      };
    }

    return { ok: true };
  });
