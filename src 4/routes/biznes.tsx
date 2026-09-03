import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero-mama.avif.asset.json";
import zuzannaImage from "@/assets/zuzanna.png.asset.json";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SignupForm } from "@/components/site/SignupForm";

export const Route = createFileRoute("/biznes")({
  head: () => ({
    meta: [
      { title: "Dla mam w biznesie — mamai.pl" },
      {
        name: "description",
        content:
          "Społeczność polskich mam, które budują własne projekty z AI. Dołącz do mam-builderek — bezpłatnie, bez zobowiązań.",
      },
      {
        property: "og:title",
        content: "Dla mam w biznesie — mamai.pl",
      },
      {
        property: "og:description",
        content:
          "Społeczność polskich mam, które budują własne projekty z AI. Dołącz do mam-builderek — bezpłatnie, bez zobowiązań.",
      },
    ],
  }),
  component: BiznesPage,
});

function BiznesPage() {
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

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-brand-lilac px-4 py-1.5 text-xs font-bold uppercase tracking-wider sm:text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-orange" />
            Mamy, które budują biznes z AI
          </div>

          <h1 className="max-w-4xl text-[2.75rem] font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Bo{" "}
            <span className="relative inline-block">
              <span className="relative z-10">„kiedyś"</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange sm:bottom-2 sm:h-4 md:h-5"
              />
            </span>{" "}
            nigdy nie&nbsp;nadejdzie.
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
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand-lavender sm:-inset-4" />
          <img
            src={heroImage.url}
            alt="Mama pracująca na laptopie z dzieckiem przy stole"
            className="aspect-[4/5] w-full rounded-3xl border-2 border-brand-black object-cover"
            loading="eager"
          />
        </div>
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
          Każda mama z pomysłem na biznes zasługuje na narzędzia, żeby go wdrożyć.
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
      body: "Od pomysłu do działającego produktu — razem, ale we własnym tempie.",
      bg: "bg-brand-cream",
    },
    {
      tag: "AI-first",
      title: "Bez zespołu IT",
      body: "Nie umiesz programować? AI wyrównuje szanse. Zaczynasz dziś, bez doświadczenia.",
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
      body: "Zobacz jak inne członkinie budują swoje biznesy na żywo. Poznaj narzędzia niewymagające kodowania w praktyce.",
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
            Dołącz do nas, jeśli...
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
                src={zuzannaImage.url}
                alt="Zuzanna Mazurek, twórczyni mamai.pl"
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
              Zuzanna Mazurek · twórczyni mamai.pl
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
          Dołącz do mam
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-brand-cream/90 sm:text-xl">
          Społeczność mam, które budują swoje projekty z AI. Wpisz maila i
          dołącz do nas.
        </p>
        <div className="mt-10">
          <SignupForm variant="builderki" />
        </div>
      </div>
    </section>
  );
}
