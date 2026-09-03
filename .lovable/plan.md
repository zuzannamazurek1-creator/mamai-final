# Nowa strona główna mamai.pl + landing „Dla mam w biznesie” pod /biznes

## Cel

Strona główna ma mówić do **wszystkich mam** i zbierać zapisy do newslettera „AI dla mam” z lead magnetem (baza promptów w Notion, wysyłana mailem). Obecna strona główna (dla mam-builderek) przenosi się bez zmian pod `/biznes` i jest podlinkowana z nawigacji oraz z dedykowanej sekcji na nowej stronie głównej.

## Struktura serwisu po zmianie

```text
/                 nowa strona główna (AI dla mam + newsletter + lead magnet)
/biznes           obecny landing dla mam-builderek (1:1, formularz zostaje). Na nowej stronie głównej i w nawigacji przycisk „Poznaj członkinie” → /czlonkinie
/czlonkinie       bez zmian
/polityka-prywatnosci, /dziekujemy, /dolacz, /whatsapp, /admin  bez zmian
```

Nawigacja (wspólna dla `/` i `/biznes`): logo → `/`, zakładka **Dla mam w biznesie** → `/biznes`, przycisk **Odbierz prompty** → kotwica do formularza na stronie głównej.

## Treści nowej strony głównej (propozycja do Twojej akceptacji)

Ton: bezpośredni, ciepły, bez żargonu. Te same kolory, font i styl kart/przycisków co teraz.

**1. Hero**
- Badge: „Mama, która nie boi się AI”
- H1: „AI to nie kolejny kurs. To 10 minut dziennie, które oddają Ci czas.”
- Podtytuł: „Proste triki, pierwsze kroki i gotowe prompty dla mam, których dniem rządzą dzieci. Bez dwugodzinnych live'ów i skomplikowanego setupu.”
- CTA: „Odbierz bazę promptów dla mam →” (kotwica do formularza) + link „Prowadzisz biznes?” → `/biznes`
- Zdjęcie: obecne hero (mama z dzieckiem przy laptopie) – do ewentualnej podmiany później.

**2. Sekcja „Brzmi znajomo?”** (pasek jak obecna „Misja”)
- Wielki cytat: „Czy to normalne, że mój 4,5-miesięczny bobas potrzebuje piersi, żeby zasnąć?” – wpisane o 3 w nocy w czat jak w Google.
- Puenta: „Chat to nie wyszukiwarka. To asystent, który może znać Twój dom, Twoje dzieci i Twój tydzień — i odpowiadać bez tłumaczenia wszystkiego od zera.”

**3. Trzy filary (karty)**
- „Proste triki” — pierwsze kroki, bez instalacji i konfiguracji. Zaczynasz dziś, z telefonu.
- „System, nie pojedyncze pytania” — budujesz swój kontekst raz i dostajesz odpowiedzi szyte na miarę.
- „Twoja przyszła praca” — po powrocie z macierzyńskiego AI będzie oczekiwane jak e-mail i Excel. Nikt nie zrobi dla nas dedykowanego szkolenia — zrobimy je same.

**4. „Co możesz zautomatyzować już w tym tygodniu”** (ciemna sekcja, numerowana lista jak obecna „Co dostajesz”)
- 01 Jadłospis na tydzień z Twoich ulubionych przepisów + gotowa lista zakupów
- 02 Wspólne zadania domowe — jedna lista dla wszystkich domowników
- 03 Baza informacji o domu — „czy mamy jeszcze makaron?” i „gdzie jest zimowa kurtka?” przestają być Twoim pytaniem
- 04 Własne mini-aplikacje bez kodowania — gdy gotowe narzędzia nie wystarczają
- Podpis pod listą: narzędzia — Claude, Gemini, ChatGPT, Notion.

**5. „Dla mam prowadzących biznes”** (wyróżniona karta, tło lilac)
- Nagłówek: „Masz pomysł na biznes? Mamy dla Ciebie osobne miejsce.”
- Tekst: „Społeczność mam-builderek, które budują własne produkty z AI — bez zespołu IT, stacjonarnie w Warszawie i online.”
- Przycisk: „Poznaj społeczność mam-builderek →” → `/biznes`

**6. Cytat założycielki** — obecny cytat Zuzanny (ten sam komponent i zdjęcie).

**7. Instagram**
- „Codzienne triki znajdziesz na moim Instagramie” + przycisk do profilu (poproszę o adres URL przy wdrożeniu).

**8. Formularz newslettera (id `#prompty`)** — pomarańczowa sekcja jak obecna
- H2: „Odbierz bazę promptów dla mam”
- Tekst: „Zapisz się do newslettera i dostań mailem link do bazy gotowych promptów: od jadłospisu, przez organizację domu, po pierwsze kroki w AI. Raz w tygodniu jeden prosty trik. Zero spamu.”
- Pole e-mail + jedna zgoda RODO (jak obecnie) + link do polityki prywatności
- Po zapisie: „Sprawdź skrzynkę — za chwilę wyślemy Ci link do bazy promptów.” (link wysyła Twoja automatyzacja mailowa, tak jak zaproszenie na WhatsApp)

**9. Stopka** — obecna (logo, copyright, credit zdjęcia, widget cookies).

## Szczegóły techniczne

- **Przeniesienie landingu**: `src/routes/index.tsx` → `src/routes/biznes.tsx` (`createFileRoute("/biznes")`), treść bez zmian, własne `head()` (tytuł „Dla mam w biznesie — mamai.pl”). Formularz na `/biznes` zapisuje ze źródłem `builderki`.
- **Nowa strona główna**: nowy `src/routes/index.tsx` z sekcjami jak wyżej, formularz zapisuje ze źródłem `newsletter`, `head()` z nowym tytułem/opisem („mamai.pl — Mama, która nie boi się AI”).
- **Wspólne komponenty**: wyciągnięcie `Nav`, `Footer`, `SignupForm`, `Checkbox` do `src/components/site/` tak, żeby obie strony używały tego samego kodu (nav z zakładką `/biznes` i aktywnym stanem przez `Link`).
- **Baza danych (Supabase)**: migracja dodająca do `public.subscribers` kolumnę `source text NOT NULL DEFAULT 'builderki'` z ograniczeniem `CHECK (source IN ('newsletter','builderki'))`. Istniejące rekordy dostają `builderki`. Uwaga: unikalność e-maila zostaje globalna — jeśli ta sama mama zapisze się na obu stronach, drugi zapis zwróci „Już jesteś na liście!” (możemy to zmienić na unikalność per źródło, jeśli wolisz).
- **Funkcja serwerowa** `src/lib/subscribe.functions.ts`: pole `source` w schemacie Zod i w insercie.
- **SEO**: `__root.tsx` — aktualizacja domyślnego tytułu/opisu pod szerszą grupę; `/biznes` dostaje własne og:title/og:description.
- **Weryfikacja**: test end-to-end obu formularzy (Playwright) i sprawdzenie w tabeli, że `source` zapisuje się poprawnie; zrzuty ekranu 375px i 1440px.

## Czego potrzebuję od Ciebie przy wdrożeniu

- Adres URL Twojego Instagrama.
- Akceptację lub poprawki tekstów powyżej (mogę je wdrożyć w wersji roboczej, a Ty dopracujesz).
