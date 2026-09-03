import { Link } from "@tanstack/react-router";
import logo from "@/assets/mamai-logo.svg.asset.json";

type NavVariant = "site" | "members";

export function Nav({ variant = "site" }: { variant?: NavVariant }) {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <Link
        to="/"
        className="flex items-center gap-2"
        aria-label="mamai.pl — strona główna"
      >
        <img src={logo.url} alt="mamai.pl" className="h-20 w-auto" />
      </Link>

      {variant === "site" ? (
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/biznes"
              className="text-sm font-bold hover:underline"
              activeProps={{ className: "underline decoration-brand-orange decoration-2 underline-offset-4" }}
            >
              Dla mam w biznesie
            </Link>
          </div>

          <a
            href="/#prompty"
            className="rounded-full bg-brand-black px-4 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03] sm:px-5"
          >
            Odbierz prompty
          </a>
        </div>
      ) : (
        <Link
          to="/biznes"
          className="rounded-full bg-brand-black px-4 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03] sm:px-5"
        >
          Dla mam w biznesie
        </Link>
      )}
    </nav>
  );
}
