import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero-mama.avif.asset.json";
import zuzannaImage from "@/assets/zuzanna.png.asset.json";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SignupForm } from "@/components/site/SignupForm";

const INSTAGRAM_URL = "https://www.instagram.com/zuzia_mama_od_ai";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mamai.pl — Mama, która nie boi się AI" },
      {
        name: "description",
        content:
          "Proste triki, pierwsze kroki i gotowe prompty AI dla mam, których dniem rządzą dzieci. Zapisz się do newslettera i odbierz bazę promptów za darmo.",
      },
      {
        property: "og:title",
        content: "mamai.pl — Mama, która nie boi się AI",
      },
      {
        property: "og:description",
        content:
          "Proste triki, pierwsze kroki i gotowe prompty AI dla mam, których dniem rządzą dzieci. Zapisz się do newslettera i odbierz bazę promptów za darmo.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black">
      <Nav />
      <main>
        <Hero />
        <SoundsFamiliar />
        <Pillars />
        <AutomateThisWeek />
        <FoundersQuote />
        <InstagramSection />
        <SignupSection />
        <ForBusinessMoms />
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
            Mama, która nie boi się AI
          </div>

          <h1 className="max-w-4xl text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Zainwestuj{" "}
            <span className="relative inline-block">
              <span className="relative z-10">10 minut dziennie</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-orange sm:bottom-2 sm:h-4 md:h-5"
              />
            </span>{" "}
            i zyskaj czas na to, co jest naprawdę ważne.
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-brand-black/80 sm:text-xl">
            Proste triki, pierwsze kroki i gotowe prompty dla mam, których
            dniem rządzą dzieci. Bez dwugodzinnych live'ów i skomplikowanego
            setupu.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#prompty"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.03]"
            >
              Odbierz bazę promptów dla mam
              <span aria-hidden="true">→</span>
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

/* ---------------- Sounds familiar ---------------- */

function SoundsFamiliar() {
  const searches = [
    {
      quote:
        "Czy to normalne, że mój 4,5-miesięczny bobas potrzebuje piersi, żeby zasnąć?",
      tag: "niemowlę",
    },
    {
      quote: "Jak przetrwać napad złości 3-latka w markecie, bez krzyku?",
      tag: "przedszkolak",
    },
    {
      quote:
        "Jak pomóc dziecku z klasy 4 w matematyce, skoro sama jej nie pamiętam?",
      tag: "szkoła",
    },
    {
      quote: "Co ugotować z tego, co mam w lodówce, żeby starczyło na jutro?",
      tag: "dom",
    },
    {
      quote:
        "Jak napisać do szefowej, że potrzebuję wolne popołudnie na wizytę u lekarza z dzieckiem?",
      tag: "praca",
    },
  ];

  return (
    <section className="border-y-2 border-brand-black bg-brand-lavender">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-4 text-xs font-black uppercase tracking-widest">
          Brzmi znajomo?
        </div>
        <h2 className="max-w-3xl text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          Wpisujesz takie pytania w czacie?
        </h2>

        <ul className="mt-10 border-t-2 border-brand-black/15">
          {searches.map((s) => (
            <li
              key={s.tag}
              className="flex flex-col gap-1 border-b-2 border-brand-black/15 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <p className="text-lg font-bold leading-snug sm:text-xl">
                „{s.quote}"
              </p>
              <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-brand-black/50">
                {s.tag}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-lg font-normal leading-relaxed text-brand-black/80 sm:text-xl">
          Chat to nie wyszukiwarka. To asystent, który może znać Twój dom,
          Twoje dzieci i Twój tydzień — i odpowiadać bez tłumaczenia
          wszystkiego od zera.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Pillars ---------------- */

function Pillars() {
  const pillars = [
    {
      tag: "OD DZIŚ",
      title: "Proste triki",
      body: "Pierwsze kroki, bez instalacji i konfiguracji. Zaczynasz dziś, z telefonu.",
      bg: "bg-brand-cream",
    },
    {
      tag: "TWÓJ KONTEKST",
      title: "System, nie pojedyncze pytania",
      body: "Budujesz swój kontekst raz i dostajesz odpowiedzi szyte na miarę.",
      bg: "bg-brand-lilac",
    },
    {
      tag: "PRZEWAGA",
      title: "Twoja praca",
      body: "Zyskaj przewagę na rynku pracy, ucząc się jak używać AI na życiowych przykładach.",
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

/* ---------------- Automate this week ---------------- */

function AutomateThisWeek() {
  const items = [
    {
      title: "Jadłospis na tydzień",
      body: "Z Twoich ulubionych przepisów, plus gotowa lista zakupów.",
    },
    {
      title: "Wspólne zadania domowe",
      body: "Jedna lista dla wszystkich domowników.",
    },
    {
      title: "Baza informacji o domu",
      body: "„Czy mamy jeszcze makaron?” i „gdzie jest zimowa kurtka?” przestają być pytaniami, na które tylko Ty znasz odpowiedź.",
    },
  ];

  return (
    <section className="border-t-2 border-brand-black bg-brand-black text-brand-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-3 text-xs font-black uppercase tracking-widest text-brand-orange">
          W tym tygodniu, za darmo
        </div>
        <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Co możesz zautomatyzować już w tym tygodniu.
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.title} className="flex gap-5 sm:flex-col sm:gap-3">
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

/* ---------------- For business moms (highlighted card, not a full section) ---------------- */

function ForBusinessMoms() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col gap-8 rounded-3xl border-2 border-brand-black bg-brand-lilac p-8 sm:p-12 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Masz pomysł na biznes? Mamy dla Ciebie osobne miejsce.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-black/80 sm:text-lg">
            Społeczność mam, które budują własne produkty z AI — bez zespołu
            IT, stacjonarnie w Warszawie i online.
          </p>
        </div>
        <Link
          to="/biznes"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-black px-7 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.03]"
        >
          Poznaj społeczność mam, które wykorzystują AI w biznesie
          <span aria-hidden="true">→</span>
        </Link>
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
              „Szkolenia o sztucznej inteligencji nie są dostosowane do
              potrzeb mam. Oglądanie o drugiej w nocy nagrania z
              live'u, gdy karmiłam kilkutygodniowe dziecko, to moja historia
              pierwszych kroków z AI. Wierzę, że Twoja może wyglądać
              inaczej."
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

/* ---------------- Instagram ---------------- */

function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
      <p className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
        Codzienne triki znajdziesz na moim Instagramie
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03]"
      >
        Zobacz na Instagramie
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

/* ---------------- Signup ---------------- */

function SignupSection() {
  return (
    <section
      id="prompty"
      className="border-t-2 border-brand-black bg-brand-orange text-brand-cream"
    >
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="text-center text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Odbierz bazę promptów dla mam
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-brand-cream/90 sm:text-xl">
          Zapisz się do newslettera i dostań mailem link do bazy gotowych
          promptów dla mam. Raz w miesiącu napiszę do Ciebie maila z
          podsumowaniem nowości mamai.pl. Zawsze możesz się wypisać z
          newslettera.
        </p>
        <div className="mt-10">
          <SignupForm variant="newsletter" />
        </div>
      </div>
    </section>
  );
}
