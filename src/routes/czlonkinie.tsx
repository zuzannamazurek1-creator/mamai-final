import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import logo from "@/assets/mamai-logo.svg.asset.json";

type Member = Tables<"members_directory">;

export const Route = createFileRoute("/czlonkinie")({
  head: () => ({
    meta: [
      { title: "Członkinie — mamai.pl" },
      {
        name: "description",
        content:
          "Poznaj członkinie społeczności mamai.pl — mamy, które budują własne projekty i biznesy z AI.",
      },
      { property: "og:title", content: "Członkinie — mamai.pl" },
      {
        property: "og:description",
        content:
          "Poznaj członkinie społeczności mamai.pl — mamy, które budują własne projekty i biznesy z AI.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MembersPage,
});

async function fetchApprovedMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("members_directory")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

function MembersPage() {
  const {
    data: members,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members_directory", "approved"],
    queryFn: fetchApprovedMembers,
  });

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-black">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="/"
          className="flex items-center gap-2"
          aria-label="mamai.pl — strona główna"
        >
          <img src={logo.url} alt="mamai.pl" className="h-20 w-auto" />
        </a>
        <a
          href="/"
          className="rounded-full bg-brand-black px-4 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03] sm:px-5"
        >
          Strona główna
        </a>
      </nav>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-black bg-brand-lilac px-4 py-1.5 text-xs font-bold uppercase tracking-wider sm:text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-orange" />
            Nasza społeczność
          </div>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Poznaj członkinie naszej społeczności
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-black/80">
            Mamy, które budują własne projekty i biznesy. Zobacz, kim są i co
            tworzą.
          </p>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <MembersGridSkeleton />
          ) : isError ? (
            <p className="rounded-2xl border-2 border-brand-black bg-white p-8 text-center text-brand-black/70">
              Nie udało się wczytać katalogu. Odśwież stronę i spróbuj ponownie.
            </p>
          ) : members && members.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border-2 border-brand-black bg-white p-8 text-center text-brand-black/70">
              Katalog dopiero się zapełnia — pierwsze profile pojawią się tu
              wkrótce!
            </p>
          )}
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

function MemberCard({ member }: { member: Member }) {
  return (
    <li className="flex flex-col items-center rounded-2xl border-2 border-brand-black bg-white p-8 text-center transition-transform hover:-translate-y-1">
      <img
        src={member.avatar_url}
        alt={`Zdjęcie profilowe: ${member.full_name}`}
        loading="lazy"
        className="h-28 w-28 rounded-full border-2 border-brand-black object-cover"
      />
      <h2 className="mt-5 text-xl font-black tracking-tight">
        {member.full_name}
      </h2>
      {member.business_name ? (
        <p className="mt-1 text-sm font-bold text-brand-orange">
          {member.business_name}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-black/80">
        {member.bio}
      </p>
      {member.business_url ? (
        <a
          href={member.business_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03]"
        >
          Zobacz projekt
        </a>
      ) : null}
    </li>
  );
}

function MembersGridSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse flex-col items-center rounded-2xl border-2 border-brand-black/20 bg-white p-8"
        >
          <div className="h-28 w-28 rounded-full bg-brand-lilac/50" />
          <div className="mt-5 h-5 w-2/3 rounded bg-brand-lilac/50" />
          <div className="mt-3 h-4 w-full rounded bg-brand-lilac/30" />
          <div className="mt-2 h-4 w-5/6 rounded bg-brand-lilac/30" />
        </li>
      ))}
    </ul>
  );
}
