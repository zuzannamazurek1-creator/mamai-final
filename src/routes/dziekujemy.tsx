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
        d="M9.315 7.584c.826-1.53 2.634-1.53 3.46 0l.164.304c.38.706 1.13 1.064 1.88.893l.343-.077c1.71-.385 2.932 1.55 1.866 2.963l-.22.304c-.503.697-.503 1.635 0 2.332l.22.304c1.066 1.413-.156 3.348-1.866 2.963l-.343-.077c-.75-.17-1.5.187-1.88.893l-.164.304c-.826 1.53-2.634 1.53-3.46 0l-.164-.304c-.38-.706-1.13-1.064-1.88-.893l-.343.077c-1.71.385-2.932-1.55-1.866-2.963l.22-.304c.503-.697.503-1.635 0-2.332l-.22-.304c-1.066-1.413.156-3.348 1.866-2.963l.343.077c.75.17 1.5-.187 1.88-.893l.164-.304zm1.634-3.154c-.577-1.068-2.089-1.068-2.666 0l-.11.204a2.25 2.25 0 01-1.413 1.06l-.226.05c-1.19.269-2.04 1.354-1.71 2.545l.05.176a2.25 2.25 0 010 1.352l-.05.176c-.33 1.19.52 2.276 1.71 2.545l.226.05a2.25 2.25 0 011.413 1.06l.11.204c.577 1.068 2.089 1.068 2.666 0l.11-.204a2.25 2.25 0 011.413-1.06l.226-.05c1.19-.269 2.04-1.354 1.71-2.545l-.05-.176a2.25 2.25 0 010-1.352l.05-.176c.33-1.19-.52-2.276-1.71-2.545l-.226-.05a2.25 2.25 0 01-1.413-1.06l-.11-.204z"
        clipRule="evenodd"
      />
      <path d="M18 9a1 1 0 11-2 0 1 1 0 012 0zM19.5 6.5a1 1 0 100-2 1 1 0 000 2zM21.5 10.5a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
}
