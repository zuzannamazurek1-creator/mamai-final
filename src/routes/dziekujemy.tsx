import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/mamai-logo.svg.asset.json";

export const Route = createFileRoute("/dziekujemy")({
  head: () => ({
    meta: [
      { title: "Dziękujemy — mamai.pl" },
      {
        name: "description",
        content:
          "Twój zapis do społeczności mamai.pl został potwierdzony. Do zobaczenia w grupie!",
      },
      {
        property: "og:title",
        content: "Dziękujemy — mamai.pl",
      },
      {
        property: "og:description",
        content:
          "Twój zapis do społeczności mamai.pl został potwierdzony. Do zobaczenia w grupie!",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-black">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <img src={logo.url} alt="mamai.pl" className="h-20 w-auto" />
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-lilac sm:h-24 sm:w-24">
            <HeartIcon className="h-10 w-10 text-brand-orange sm:h-12 sm:w-12" />
          </div>

          <h1 className="mt-8 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Dziękujemy, że jesteś z nami!
            <span className="ml-2 inline-block align-middle" aria-hidden="true">
              <PartyIcon className="h-9 w-9 text-brand-orange sm:h-11 sm:w-11" />
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-brand-black/80 sm:text-xl">
            Twój zapis do społeczności mamai został potwierdzony. Cieszymy się,
            że tu jesteś! W ciągu kilku minut wyślemy Ci na maila zaproszenie do
            naszej zamkniętej grupy na WhatsAppie, gdzie znajdziesz wsparcie,
            inspiracje i kontakt z innymi mamami. Do zobaczenia w społeczności!
          </p>
        </div>
      </main>

      <footer className="border-t-2 border-brand-black/10 bg-brand-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-8 sm:px-8">
          <img src={logo.url} alt="mamai.pl" className="h-7 w-auto" />
        </div>
      </footer>
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.28 2.25 8.5 2.25 5.42 4.717 3 7.688 3A5.49 5.49 0 0112 5.052 5.49 5.49 0 0116.313 3c2.973 0 5.437 2.42 5.437 5.5 0 3.78-2.437 6.86-6.753 10.995l-.022.012-.007.003-.002.001a.75.75 0 01-.926 0l-.002-.001z" />
    </svg>
  );
}

function PartyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
        clipRule="evenodd"
      />
      <path d="M17.25 8.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM5.055 6.805a.75.75 0 01.99-.38l2.5 1a.75.75 0 11-.55 1.4l-2.5-1a.75.75 0 01-.38-.99zm13.89 0a.75.75 0 01-.38.99l-2.5 1a.75.75 0 11-.55-1.4l2.5-1a.75.75 0 01.99.38z" />
    </svg>
  );
}
