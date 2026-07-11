import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/mamai-logo.svg.asset.json";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności — mamai.pl" },
      {
        name: "description",
        content:
          "Dowiedz się, jak przetwarzamy dane w społeczności mamai.pl — zgodnie z RODO.",
      },
      {
        property: "og:title",
        content: "Polityka prywatności — mamai.pl",
      },
      {
        property: "og:description",
        content:
          "Dowiedz się, jak przetwarzamy dane w społeczności mamai.pl — zgodnie z RODO.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label="mamai.pl — strona główna">
          <img src={logo.url} alt="mamai.pl" className="h-20 w-auto" />
        </Link>
        <Link
          to="/"
          className="rounded-full bg-brand-black px-4 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03] sm:px-5"
        >
          Wróć
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
        <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Polityka prywatności
        </h1>
        <p className="mt-4 text-sm text-brand-black/70">
          Ostatnia aktualizacja: 11 lipca 2026 r.
        </p>

        <div className="mt-12 space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              1. Kto jest administratorem danych?
            </h2>
            <p className="mt-4 text-brand-black/80">
              Administratorem Twoich danych osobowych jest Zuzanna Mazurek,
              prowadząca działalność pod nazwą mamai.pl. Kontakt:
              <a
                href="mailto:hello@mamai.pl"
                className="ml-1 font-bold underline underline-offset-2"
              >
                hello@mamai.pl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              2. Jakie dane zbieramy?
            </h2>
            <p className="mt-4 text-brand-black/80">
              Zbieramy wyłącznie Twój adres e-mail, który podajesz dobrowolnie w
              formularzu zapisu do społeczności. Nie wymagamy podawania imienia,
              nazwiska ani innych danych.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              3. W jakim celu przetwarzamy dane?
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-black/80">
              <li>
                Aby skontaktować się z Tobą w sprawie społeczności mamai.pl.
              </li>
              <li>
                Aby wysyłać Ci newsletter z informacjami o narzędziach AI,
                materiałach edukacyjnych i wydarzeniach.
              </li>
              <li>Aby chronić nasze prawnie uzasadnione interesy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              4. Podstawa prawna przetwarzania
            </h2>
            <p className="mt-4 text-brand-black/80">
              Twoje dane przetwarzamy na podstawie Twojej dobrowolnej zgody,
              wyrażonej podczas zapisu do formularza. Zgodę możesz wycofać w
              dowolnym momencie, klikając link rezygnacji w każdym mailu lub
              pisząc na{" "}
              <a
                href="mailto:hello@mamai.pl"
                className="font-bold underline underline-offset-2"
              >
                hello@mamai.pl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              5. Komu przekazujemy dane?
            </h2>
            <p className="mt-4 text-brand-black/80">
              Twoje dane przechowujemy w bezpiecznej bazie danych Lovable Cloud.
              Nie sprzedajemy, nie wypożyczamy i nie udostępniamy Twoich danych
              osobom trzecim do celów marketingowych.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              6. Jak długo przechowujemy dane?
            </h2>
            <p className="mt-4 text-brand-black/80">
              Przechowujemy Twój adres e-mail do momentu wycofania zgody lub
              zakończenia działalności społeczności. Po wycofaniu zgody usuwamy
              Twój adres z listy mailingowej w ciągu 30 dni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              7. Twoje prawa
            </h2>
            <p className="mt-4 text-brand-black/80">
              Masz prawo do: dostępu do swoich danych, sprostowania, usunięcia
              („prawa do bycia zapomnianym"), ograniczenia przetwarzania,
              przenoszenia danych oraz wniesienia sprzeciwu. Aby skorzystać z
              praw, napisz na{" "}
              <a
                href="mailto:hello@mamai.pl"
                className="font-bold underline underline-offset-2"
              >
                hello@mamai.pl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              8. Pliki cookies
            </h2>
            <p className="mt-4 text-brand-black/80">
              Strona mamai.pl używa podstawowych plików cookies niezbędnych do
              jej prawidłowego działania oraz narzędzi analitycznych i widgetu
              zgód cookies (Common Ninja). Szczegóły znajdziesz w panelu
              preferencji cookies wyświetlanym na stronie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              9. Zmiany w polityce prywatności
            </h2>
            <p className="mt-4 text-brand-black/80">
              Możemy aktualizować niniejszą politykę. O każdej istotnej zmianie
              poinformujemy Cię mailowo lub poprzez widoczny komunikat na
              stronie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              10. Kontakt
            </h2>
            <p className="mt-4 text-brand-black/80">
              W sprawach związanych z ochroną danych osobowych skontaktuj się z
              nami:{" "}
              <a
                href="mailto:hello@mamai.pl"
                className="font-bold underline underline-offset-2"
              >
                hello@mamai.pl
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t-2 border-brand-black bg-brand-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center">
            <img src={logo.url} alt="mamai.pl" className="h-7 w-auto" />
          </div>
          <p className="text-brand-black/70">
            © {new Date().getFullYear()} mamai.pl · Zuzanna Mazurek
          </p>
        </div>
      </footer>
    </div>
  );
}
