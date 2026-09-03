import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { subscribe, type SubscribeResult } from "@/lib/subscribe.functions";
import { Checkbox } from "@/components/site/Checkbox";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export type SignupVariant = "newsletter" | "builderki";

const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function SignupForm({ variant }: { variant: SignupVariant }) {
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = useState("");
  const [gdprContact, setGdprContact] = useState(false);
  const [gdprNewsletter, setGdprNewsletter] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldError, setFieldError] = useState<{
    email?: string;
    gdprContact?: string;
    gdprNewsletter?: string;
  }>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: typeof fieldError = {};
    if (!email.trim()) errs.email = "Wpisz swój adres e-mail";
    else if (!emailValid(email)) errs.email = "Nieprawidłowy adres e-mail";
    if (!gdprContact) errs.gdprContact = "Ta zgoda jest wymagana, żeby dołączyć";
    if (!gdprNewsletter) errs.gdprNewsletter = "Ta zgoda jest wymagana, żeby dołączyć";
    setFieldError(errs);
    if (Object.keys(errs).length > 0) {
      setStatus({ kind: "idle" });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const result: SubscribeResult = await subscribeFn({
        data: {
          email: email.trim().toLowerCase(),
          gdpr_contact: true as const,
          gdpr_newsletter: true as const,
          source: variant,
        },
      });
      if (result.ok) {
        setStatus({ kind: "success" });
      } else if (result.code === "duplicate") {
        setStatus({ kind: "error", message: "Już jesteś na liście!" });
      } else {
        setStatus({
          kind: "error",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        kind: "error",
        message: "Coś poszło nie tak. Spróbuj ponownie.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border-2 border-brand-cream bg-brand-black p-8 text-center"
      >
        <div className="text-4xl">{variant === "newsletter" ? "📬" : "🎉"}</div>
        <p className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
          {variant === "newsletter" ? "Sprawdź skrzynkę!" : "Brawo, jesteś jedną z nas!"}
        </p>
        <p className="mt-3 text-base text-brand-cream/85">
          {variant === "newsletter"
            ? "Za chwilę wyślemy Ci link do bazy promptów."
            : "Za chwilę dostaniesz od nas pierwszego maila."}
        </p>
      </div>
    );
  }

  const inputError = fieldError.email;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-brand-cream bg-brand-cream p-6 text-brand-black sm:p-8"
    >
      <label htmlFor={`email-${variant}`} className="block text-sm font-bold">
        Twój adres e-mail
      </label>
      <input
        id={`email-${variant}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={255}
        placeholder="ty@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldError.email) setFieldError((f) => ({ ...f, email: undefined }));
          if (status.kind === "error") setStatus({ kind: "idle" });
        }}
        aria-invalid={!!inputError}
        aria-describedby={inputError ? `email-error-${variant}` : undefined}
        className={`mt-2 w-full rounded-2xl border-2 bg-white px-4 py-4 text-base font-normal outline-none transition placeholder:text-brand-black/40 focus:ring-4 ${
          inputError
            ? "border-brand-orange focus:ring-brand-orange/30"
            : "border-brand-black focus:ring-brand-orange/30"
        }`}
      />
      {inputError && (
        <p id={`email-error-${variant}`} className="mt-2 text-sm font-bold text-brand-orange">
          {inputError}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <Checkbox
          id={`gdpr-contact-${variant}`}
          checked={gdprContact}
          onChange={(v) => {
            setGdprContact(v);
            if (fieldError.gdprContact)
              setFieldError((f) => ({ ...f, gdprContact: undefined }));
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          required
          error={!!fieldError.gdprContact}
        >
          {variant === "newsletter" ? (
            <>
              <span className="font-bold">Wymagane.</span> Wyrażam zgodę na
              przetwarzanie mojego adresu e-mail przez mamai.pl w celu
              wysyłki bazy promptów dla mam.
            </>
          ) : (
            <>
              <span className="font-bold">Wymagane.</span> Wyrażam zgodę na
              przetwarzanie mojego adresu e-mail przez mamai.pl w celu
              kontaktu i dołączenia do społeczności mam-builderek.
            </>
          )}
        </Checkbox>
        {fieldError.gdprContact && (
          <p className="text-sm font-bold text-brand-orange">{fieldError.gdprContact}</p>
        )}

        <Checkbox
          id={`gdpr-newsletter-${variant}`}
          checked={gdprNewsletter}
          onChange={(v) => {
            setGdprNewsletter(v);
            if (fieldError.gdprNewsletter)
              setFieldError((f) => ({ ...f, gdprNewsletter: undefined }));
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          required
          error={!!fieldError.gdprNewsletter}
        >
          <span className="font-bold">Wymagane.</span> Wyrażam zgodę na
          przetwarzanie mojego adresu e-mail w celu wysyłki newslettera
          mamai.pl (raz w miesiącu) z informacjami o narzędziach AI,
          materiałach i wydarzeniach. Zawsze mogę się wypisać.
        </Checkbox>
        {fieldError.gdprNewsletter && (
          <p className="text-sm font-bold text-brand-orange">{fieldError.gdprNewsletter}</p>
        )}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-brand-black/70">
        Administratorem danych jest Zuzanna Mazurek. Pełna{" "}
        <Link to="/polityka-prywatnosci" className="font-bold underline underline-offset-2">
          Polityka prywatności
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.kind === "submitting" ? (
          "Zapisujemy..."
        ) : variant === "newsletter" ? (
          <>
            Zapisz się i odbierz bazę <span aria-hidden="true">→</span>
          </>
        ) : (
          <>
            Dołącz do społeczności <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      {status.kind === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-xl border-2 border-brand-orange bg-white px-4 py-3 text-center text-sm font-bold text-brand-black"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
