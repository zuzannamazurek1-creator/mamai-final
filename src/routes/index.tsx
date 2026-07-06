import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { subscribe, type SubscribeResult } from "@/lib/subscribe.functions";
import heroImage from "@/assets/hero-mama.avif.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mamyai.pl — Mamy, które budują" },
      {
        name: "description",
        content:
          "Społeczność polskich mam, które budują własne projekty z AI. Dołącz do mam-builderek — bezpłatnie, bez zobowiązań.",
      },
      {
        property: "og:title",
        content: "mamyai.pl — Mamy, które budują",
      },
      {
        property: "og:description",
        content:
          "Społeczność polskich mam, które budują własne projekty z AI. Dołącz do mam-builderek — bezpłatnie, bez zobowiązań.",
      },
    ],
  }),
  component: LandingPage,
});

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black">
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Pillars />
        <Offer />
        <ForWhom />
        <FoundersQuote />
        <JoinSteps />
        <SignupSection />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <a
        href="/"
        className="flex items-center gap-2 text-lg font-black tracking-tight"
      >
        <span className="inline-block h-3 w-3 rounded-full bg-brand-orange" />
        mamyai.pl
      </a>
      <a
        href="#dolacz"
        className="rounded-full bg-brand-black px-4 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03] sm:px-5"
      >
        Dołącz
      </a>
    </nav>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-brand-lilac px-4 py-1.5 text-xs font-bold uppercase tracking-wider sm:text-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-brand-orange" />
        Mamy, które budują
      </div>

      <h1 className="max-w-4xl text-[2.75rem] font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        Bo{" "}
        <span className="relative inline-block">
          <span className="relative z-10">„kiedyś"</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange sm:bottom-2 sm:h-4 md:h-5"
          />
        </span>{" "}
        nigdzie nie&nbsp;nadejdzie.
      </h1>

      <p className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-brand-black/80 sm:text-xl">
        Twój pomysł nie może czekać aż dzieci dorosną. Dołącz do
        mam-builderek, które nie czekają na „odpowiedni moment".
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#dolacz"
          className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.03]"
        >
          Dołącz do społeczności
          <span aria-hidden="true">→</span>
        </a>
        <a
          href="#misja"
          className="text-base font-bold underline decoration-brand-orange decoration-2 underline-offset-4"
        >
          Poznaj misję
        </a>
      </div>
    </section>
  );
}

/* ---------------- Mission ---------------- */

function Mission() {
  return (
    <section
      id="misja"
      className="border-y-2 border-brand-black bg-brand-lavender"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-4 text-xs font-black uppercase tracking-widest">
          Misja
        </div>
        <p className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Każda mama z pomysłem zasługuje na narzędzia, żeby go wdrożyć.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Pillars ---------------- */

function Pillars() {
  const pillars = [
    {
      tag: "0 → 1",
      title: "Od pomysłu do produktu",
      body: "Od pomysłu do działającego produktu — razem, we własnym tempie.",
      bg: "bg-brand-cream",
    },
    {
      tag: "AI-first",
      title: "Kod razem z AI",
      body: "Piszesz kod razem z AI — nawet jeśli nigdy wcześniej nie miałaś styku z technologią.",
      bg: "bg-brand-lilac",
    },
    {
      tag: "WAW → PL",
      title: "Warszawa i online",
      body: "Stacjonarnie w Warszawie, ale społeczność jest online — dla każdej mamy w Polsce.",
      bg: "bg-brand-cream",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-5 md:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.tag}
            className={`flex flex-col rounded-3xl border-2 border-brand-black p-7 sm:p-8 ${p.bg}`}
          >
            <div className="mb-8 inline-flex w-fit rounded-full bg-brand-orange px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-cream">
              {p.tag}
            </div>
            <h3 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              {p.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-brand-black/80">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Offer ---------------- */

function Offer() {
  const items = [
    {
      title: "Narzędzia bez kodu",
      body: "Konkretne narzędzia AI i prompty, które działają. Zbudujesz prototyp bez znajomości programowania.",
    },
    {
      title: "Społeczność mam-builderek",
      body: "Networking z kobietami, które wiedzą co to znaczy budować z niemowlakiem na rękach. Ograniczony czas, wielkie plany — i wzajemna motywacja.",
    },
    {
      title: "Building in public",
      body: "Pokazujemy jak budujemy mamyai.pl — tymi samymi narzędziami AI, które polecamy.",
    },
    {
      title: "Meetupy w Warszawie",
      body: "Żywy kontakt i wspólna praca — dla mam z Warszawy i okolic.",
    },
  ];

  return (
    <section className="border-t-2 border-brand-black bg-brand-black text-brand-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-3 text-xs font-black uppercase tracking-widest text-brand-orange">
          Co dostajesz
        </div>
        <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Wszystko, czego potrzebujesz, żeby zacząć budować.
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.title} className="flex gap-5">
              <div className="shrink-0 text-2xl font-black text-brand-orange sm:text-3xl">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-cream/80">
                  {it.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- For whom ---------------- */

function ForWhom() {
  const bullets = [
    "Masz projekt w głowie i szukasz miejsca, żeby go wreszcie ruszyć",
    "Blokuje Cię brak technicznych zasobów, nie brak chęci",
    "Chcesz budować coś swojego — niekoniecznie wielkiego, ale prawdziwego",
    "Szukasz kogoś, kto to rozumie bez tłumaczenia",
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        <div>
          <div className="mb-3 text-xs font-black uppercase tracking-widest">
            Dla kogo
          </div>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Poznasz się?
          </h2>
        </div>
        <ul className="space-y-5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex gap-4 border-b-2 border-brand-black/15 pb-5 text-lg font-normal leading-relaxed sm:text-xl"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-orange"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Founder quote ---------------- */

function FoundersQuote() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="border-y-2 border-brand-black bg-brand-lilac">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
          <div className="shrink-0">
            {imgFailed ? (
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-brand-black bg-brand-orange text-4xl font-black text-brand-cream sm:h-40 sm:w-40">
                ZM
              </div>
            ) : (
              <img
                src="/zuzanna.jpg"
                alt="Zuzanna Mazurek, twórczyni mamyai.pl"
                onError={() => setImgFailed(true)}
                className="h-32 w-32 rounded-full border-2 border-brand-black object-cover sm:h-40 sm:w-40"
              />
            )}
          </div>
          <div>
            <p className="text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl">
              „Na pierwszym macierzyńskim miałam pomysły i zero możliwości
              wdrożenia. Na drugim — AI zmieniło reguły gry."
            </p>
            <p className="mt-6 text-sm font-bold uppercase tracking-widest">
              Zuzanna Mazurek · twórczyni mamyai.pl
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Join steps ---------------- */

function JoinSteps() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-3 text-xs font-black uppercase tracking-widest">
        Jak dołączyć
      </div>
      <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        Dwa kroki. Bez zobowiązań.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          {
            n: "01",
            title: "Wpisz maila",
            body: "Za darmo, bez zobowiązań.",
          },
          {
            n: "02",
            title: "Trafiasz do społeczności",
            body: "Tam zaczyna się reszta.",
          },
        ].map((s) => (
          <div
            key={s.n}
            className="rounded-3xl border-2 border-brand-black bg-brand-cream p-8"
          >
            <div className="text-5xl font-black text-brand-orange sm:text-6xl">
              {s.n}
            </div>
            <h3 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">
              {s.title}
            </h3>
            <p className="mt-2 text-base text-brand-black/80">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Signup ---------------- */

function SignupSection() {
  return (
    <section
      id="dolacz"
      className="border-t-2 border-brand-black bg-brand-orange text-brand-cream"
    >
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="text-center text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Dołącz do mam-builderek
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-brand-cream/90 sm:text-xl">
          Społeczność mam, które budują swoje projekty z AI. Wpisz maila i
          dołącz do nas.
        </p>
        <div className="mt-10">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

function SignupForm() {
  const subscribeFn = useServerFn(subscribe);
  const [email, setEmail] = useState("");
  const [gdprContact, setGdprContact] = useState(false);
  const [gdprNewsletter, setGdprNewsletter] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldError, setFieldError] = useState<{
    email?: string;
    gdpr?: string;
  }>({});

  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: { email?: string; gdpr?: string } = {};
    if (!email.trim()) errs.email = "Wpisz swój adres e-mail";
    else if (!emailValid(email)) errs.email = "Nieprawidłowy adres e-mail";
    if (!gdprContact) errs.gdpr = "Zgoda jest wymagana, żeby dołączyć";
    setFieldError(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus({ kind: "submitting" });
    try {
      const result: SubscribeResult = await subscribeFn({
        data: {
          email: email.trim().toLowerCase(),
          gdpr_contact: true as const,
          gdpr_newsletter: gdprNewsletter,
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
        <div className="text-4xl">🎉</div>
        <p className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
          Brawo, jesteś jedną z nas!
        </p>
        <p className="mt-3 text-base text-brand-cream/85">
          Za chwilę dostaniesz od nas pierwszego maila.
        </p>
      </div>
    );
  }

  const inputError = fieldError.email;
  const gdprError = fieldError.gdpr;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-brand-cream bg-brand-cream p-6 text-brand-black sm:p-8"
    >
      <label htmlFor="email" className="block text-sm font-bold">
        Twój adres e-mail
      </label>
      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={255}
        placeholder="ty@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldError.email)
            setFieldError((f) => ({ ...f, email: undefined }));
          if (status.kind === "error") setStatus({ kind: "idle" });
        }}
        aria-invalid={!!inputError}
        aria-describedby={inputError ? "email-error" : undefined}
        className={`mt-2 w-full rounded-2xl border-2 bg-white px-4 py-4 text-base font-normal outline-none transition placeholder:text-brand-black/40 focus:ring-4 ${
          inputError
            ? "border-brand-orange focus:ring-brand-orange/30"
            : "border-brand-black focus:ring-brand-orange/30"
        }`}
      />
      {inputError && (
        <p
          id="email-error"
          className="mt-2 text-sm font-bold text-brand-orange"
        >
          {inputError}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <Checkbox
          id="gdpr-contact"
          checked={gdprContact}
          onChange={(v) => {
            setGdprContact(v);
            if (fieldError.gdpr)
              setFieldError((f) => ({ ...f, gdpr: undefined }));
          }}
          required
          error={!!gdprError}
        >
          <span className="font-bold">Wymagane.</span> Wyrażam zgodę na
          przetwarzanie mojego adresu e-mail przez mamyai.pl w celu kontaktu
          dotyczącego społeczności.
        </Checkbox>
        {gdprError && (
          <p className="text-sm font-bold text-brand-orange">{gdprError}</p>
        )}

        <Checkbox
          id="gdpr-newsletter"
          checked={gdprNewsletter}
          onChange={setGdprNewsletter}
        >
          Chcę otrzymywać newsletter mamyai.pl z informacjami o narzędziach
          AI, materiałach i wydarzeniach.
        </Checkbox>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-brand-black/70">
        Administratorem danych jest Zuzanna Mazurek. Pełna{" "}
        <a
          href="#polityka-prywatnosci"
          className="font-bold underline underline-offset-2"
        >
          Polityka prywatności
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-black px-6 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.kind === "submitting" ? (
          "Zapisujemy..."
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

function Checkbox({
  id,
  checked,
  onChange,
  children,
  required,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer gap-3 text-sm leading-relaxed"
    >
      <span className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-brand-black bg-white transition checked:border-brand-black checked:bg-brand-orange focus:outline-none focus:ring-4 focus:ring-brand-orange/30"
          style={error ? { borderColor: "#EB582F" } : undefined}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute inset-0 m-auto hidden h-4 w-4 stroke-brand-cream peer-checked:block"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t-2 border-brand-black bg-brand-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 font-black">
          <span className="inline-block h-3 w-3 rounded-full bg-brand-orange" />
          mamyai.pl
        </div>
        <p className="text-brand-black/70">
          © {new Date().getFullYear()} mamyai.pl · Zuzanna Mazurek
        </p>
      </div>
    </footer>
  );
}
