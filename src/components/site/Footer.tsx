import logo from "@/assets/mamai-logo.svg.asset.json";

export function Footer() {
  return (
    <footer className="border-t-2 border-brand-black bg-brand-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center">
          <img src={logo.url} alt="mamai.pl" className="h-7 w-auto" />
        </div>
        <p className="text-brand-black/70">
          © {new Date().getFullYear()} mamai.pl · Zuzanna Mazurek
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-6 text-xs text-brand-black/60 sm:px-8">
        Photo by{" "}
        <a
          href="https://unsplash.com/@ergonofis?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          className="underline underline-offset-2 hover:text-brand-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          ergonofis
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/a-woman-sitting-at-a-table-with-a-child-using-a-laptop-Yt-xvKkXtCc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          className="underline underline-offset-2 hover:text-brand-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </div>
      <div className="commonninja_component pid-05f81463-d2c3-4ef9-9cae-3ff815f54983" />
    </footer>
  );
}
