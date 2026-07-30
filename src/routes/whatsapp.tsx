import { createFileRoute, redirect } from "@tanstack/react-router";

// Przekierowanie mamai.pl/whatsapp -> przewodnik dla nowych członkiń (Notion).
// Tymczasowe (307), więc możesz w przyszłości podmienić adres bez problemów z cache.
const DESTINATION =
  "https://ninth-chipmunk-875.notion.site/Witaj-w-spo-eczno-ci-mamai-Przewodnik-dla-nowych-cz-onki-3ad5c03df706810c9e90ea0823da424c";

export const Route = createFileRoute("/whatsapp")({
  beforeLoad: () => {
    throw redirect({ href: DESTINATION });
  },
  head: () => ({
    meta: [
      { title: "Przekierowanie — mamai.pl" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  // Awaryjnie (gdyby przekierowanie nie zadziałało) pokaż link
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <a
        href={DESTINATION}
        className="rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-brand-cream"
      >
        Przejdź do przewodnika dla nowych członkiń
      </a>
    </div>
  ),
});
