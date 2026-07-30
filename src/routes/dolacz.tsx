import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  compressAvatar,
  type CompressedAvatar,
} from "@/lib/avatar-compression";
import logo from "@/assets/mamai-logo.svg.asset.json";

const BIO_MAX_LENGTH = 250;

export const Route = createFileRoute("/dolacz")({
  head: () => ({
    meta: [
      { title: "Dołącz do katalogu — mamai.pl" },
      {
        name: "description",
        content: "Zgłoś swój profil do katalogu członkiń społeczności mamai.pl.",
      },
      // Tajna podstrona — nie indeksuj w wyszukiwarkach
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-black">
      <Toaster position="top-center" richColors />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <a href="/" aria-label="mamai.pl — strona główna">
          <img src={logo.url} alt="mamai.pl" className="h-20 w-auto" />
        </a>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-20 sm:px-8">
        {submitted ? (
          <SuccessMessage />
        ) : (
          <>
            <h1 className="text-center text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Dołącz do katalogu członkiń
            </h1>
            <p className="mt-4 text-center text-lg leading-relaxed text-brand-black/80">
              Wypełnij formularz, a Twój profil pojawi się w katalogu po
              akceptacji administratorki.
            </p>
            <ApplicationForm onSuccess={() => setSubmitted(true)} />
          </>
        )}
      </main>

      <footer className="border-t-2 border-brand-black/10 bg-brand-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-8 sm:px-8">
          <img src={logo.url} alt="mamai.pl" className="h-7 w-auto" />
        </div>
      </footer>
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border-2 border-brand-black bg-white p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-lilac">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="h-8 w-8 text-brand-orange"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-black tracking-tight">Dziękujemy!</h1>
      <p className="mt-3 text-lg leading-relaxed text-brand-black/80">
        Twoje zgłoszenie zostało wysłane i czeka na akceptację administratorki.
      </p>
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border-2 border-brand-black bg-white px-4 py-3 text-base text-brand-black placeholder:text-brand-black/40 focus:outline-none focus:ring-2 focus:ring-brand-orange";

function ApplicationForm({ onSuccess }: { onSuccess: () => void }) {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [consent, setConsent] = useState(false);

  const [avatar, setAvatar] = useState<CompressedAvatar | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressAvatar(file);
      setAvatar(compressed);
      setAvatarPreview((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return URL.createObjectURL(compressed.blob);
      });
    } catch (error) {
      setAvatar(null);
      setAvatarPreview(null);
      toast.error(
        error instanceof Error
          ? error.message
          : "Nie udało się przetworzyć zdjęcia.",
      );
    } finally {
      setIsCompressing(false);
    }
  }

  function normalizeUrl(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim()) {
      toast.error("Podaj swoje imię i nazwisko.");
      return;
    }
    if (!bio.trim()) {
      toast.error("Napisz krótkie bio.");
      return;
    }
    if (!avatar) {
      toast.error("Dodaj zdjęcie profilowe.");
      return;
    }
    if (!consent) {
      toast.error("Zaznacz zgodę na przetwarzanie danych.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Wyślij skompresowane zdjęcie do Supabase Storage
      const filePath = `${crypto.randomUUID()}.${avatar.extension}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatar.blob, {
          contentType: avatar.contentType,
          cacheControl: "31536000",
        });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // 2. Zapisz zgłoszenie ze statusem "pending"
      const { error: insertError } = await supabase
        .from("members_directory")
        .insert({
          full_name: fullName.trim(),
          bio: bio.trim().slice(0, BIO_MAX_LENGTH),
          business_name: businessName.trim() || null,
          business_url: normalizeUrl(businessUrl),
          avatar_url: publicUrl,
          consent_gdpr: true,
          status: "pending",
        });
      if (insertError) throw insertError;

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6 rounded-2xl border-2 border-brand-black bg-white p-6 sm:p-10"
      noValidate
    >
      <div>
        <label htmlFor="full_name" className="mb-2 block text-sm font-bold">
          Imię i nazwisko <span className="text-brand-orange">*</span>
        </label>
        <input
          id="full_name"
          type="text"
          required
          maxLength={120}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="np. Anna Kowalska"
          className={inputClassName}
        />
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="bio" className="block text-sm font-bold">
            Krótkie bio <span className="text-brand-orange">*</span>
          </label>
          <span
            className={`text-xs font-bold ${
              bio.length >= BIO_MAX_LENGTH
                ? "text-brand-orange"
                : "text-brand-black/50"
            }`}
          >
            {bio.length}/{BIO_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="bio"
          required
          rows={4}
          maxLength={BIO_MAX_LENGTH}
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX_LENGTH))}
          placeholder="Napisz kilka słów o sobie i o tym, co tworzysz…"
          className={`${inputClassName} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="business_name" className="mb-2 block text-sm font-bold">
          Nazwa biznesu / projektu
        </label>
        <input
          id="business_name"
          type="text"
          maxLength={120}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="np. Pracownia Ani"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="business_url" className="mb-2 block text-sm font-bold">
          Link do biznesu / projektu
        </label>
        <input
          id="business_url"
          type="url"
          value={businessUrl}
          onChange={(e) => setBusinessUrl(e.target.value)}
          placeholder="np. pracownia-ani.pl"
          className={inputClassName}
        />
      </div>

      <div>
        <span className="mb-2 block text-sm font-bold">
          Zdjęcie profilowe <span className="text-brand-orange">*</span>
        </span>
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-brand-black bg-brand-lilac/40">
            {isCompressing ? (
              <Spinner />
            ) : avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Podgląd zdjęcia profilowego"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-brand-black/30"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              className="rounded-full border-2 border-brand-black bg-transparent px-5 py-2 text-sm font-bold transition-transform hover:scale-[1.03] disabled:opacity-50"
            >
              {avatarPreview ? "Zmień zdjęcie" : "Wybierz zdjęcie"}
            </button>
            <p className="mt-2 text-xs text-brand-black/60">
              Zdjęcie zostanie automatycznie przycięte do kwadratu i
              skompresowane (max 100 KB).
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Wybierz zdjęcie profilowe"
        />
      </div>

      <div className="rounded-xl bg-brand-cream p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-brand-orange"
          />
          <span className="text-sm leading-relaxed">
            Wyrażam zgodę na przetwarzanie moich danych osobowych oraz
            publikację mojego wizerunku (zdjęcia profilowego) w katalogu
            społeczności na tej stronie. Wiem, że mogę wycofać zgodę w dowolnym
            momencie. <span className="text-brand-orange">*</span>
          </span>
        </label>
        <p className="mt-3 pl-8 text-xs text-brand-black/60">
          Administratorem Twoich danych jest właściciel strony. Szczegóły
          znajdziesz w naszej{" "}
          <Link
            to="/polityka-prywatnosci"
            className="font-bold underline hover:text-brand-orange"
          >
            Polityce Prywatności
          </Link>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isCompressing}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-4 text-base font-bold text-brand-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Spinner light />
            Wysyłanie…
          </>
        ) : (
          "Wyślij zgłoszenie"
        )}
      </button>
    </form>
  );
}

function Spinner({ light }: { light?: boolean }) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-t-transparent ${
        light ? "border-brand-cream" : "border-brand-orange"
      }`}
      aria-hidden="true"
    />
  );
}
