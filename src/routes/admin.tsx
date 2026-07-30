import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Member = Tables<"members_directory">;
type StatusFilter = "pending" | "approved" | "rejected";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel moderacji — mamai.pl" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoadingSession(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream px-5 py-10 text-brand-black sm:px-8">
      <Toaster position="top-center" richColors />
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Panel moderacji
        </h1>
        {isLoadingSession ? (
          <p className="mt-8 text-brand-black/60">Ładowanie…</p>
        ) : session ? (
          <Dashboard onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border-2 border-brand-black bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setIsSigningIn(false);
    if (error) {
      toast.error("Nieprawidłowy e-mail lub hasło.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-md space-y-4 rounded-2xl border-2 border-brand-black bg-white p-6 sm:p-8"
    >
      <p className="text-sm text-brand-black/70">
        Zaloguj się kontem administratorki, aby zarządzać zgłoszeniami.
      </p>
      <div>
        <label htmlFor="admin_email" className="mb-2 block text-sm font-bold">
          E-mail
        </label>
        <input
          id="admin_email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
        />
      </div>
      <div>
        <label
          htmlFor="admin_password"
          className="mb-2 block text-sm font-bold"
        >
          Hasło
        </label>
        <input
          id="admin_password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClassName}
        />
      </div>
      <button
        type="submit"
        disabled={isSigningIn}
        className="w-full rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSigningIn ? "Logowanie…" : "Zaloguj się"}
      </button>
    </form>
  );
}

const FILTER_LABELS: Record<StatusFilter, string> = {
  pending: "Oczekujące",
  approved: "Zatwierdzone",
  rejected: "Odrzucone",
};

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin_members", filter],
    queryFn: async (): Promise<Member[]> => {
      const { data, error } = await supabase
        .from("members_directory")
        .select("*")
        .eq("status", filter)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin_members"] });
    queryClient.invalidateQueries({ queryKey: ["members_directory"] });
  }

  async function updateStatus(member: Member, status: StatusFilter) {
    const { error } = await supabase
      .from("members_directory")
      .update({ status })
      .eq("id", member.id);
    if (error) {
      toast.error("Nie udało się zapisać zmiany. Czy masz uprawnienia?");
      return;
    }
    toast.success(
      status === "approved"
        ? `Profil „${member.full_name}" zatwierdzony — jest już w katalogu.`
        : `Profil „${member.full_name}" odrzucony.`,
    );
    refresh();
  }

  async function deleteMember(member: Member) {
    if (
      !window.confirm(
        `Usunąć profil „${member.full_name}" wraz ze zdjęciem? Tej operacji nie można cofnąć.`,
      )
    ) {
      return;
    }
    // Usuń zdjęcie z bucketa (ścieżka to ostatni segment publicznego URL-a)
    const fileName = member.avatar_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("avatars").remove([fileName]);
    }
    const { error } = await supabase
      .from("members_directory")
      .delete()
      .eq("id", member.id);
    if (error) {
      toast.error("Nie udało się usunąć profilu.");
      return;
    }
    toast.success(`Profil „${member.full_name}" został usunięty.`);
    refresh();
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FILTER_LABELS) as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full border-2 border-brand-black px-4 py-2 text-sm font-bold transition-colors ${
                filter === status
                  ? "bg-brand-black text-brand-cream"
                  : "bg-transparent hover:bg-brand-lilac/50"
              }`}
            >
              {FILTER_LABELS[status]}
            </button>
          ))}
        </div>
        <button
          onClick={onSignOut}
          className="text-sm font-bold underline hover:text-brand-orange"
        >
          Wyloguj się
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p className="text-brand-black/60">Ładowanie zgłoszeń…</p>
        ) : members && members.length > 0 ? (
          members.map((member) => (
            <article
              key={member.id}
              className="flex flex-col gap-4 rounded-2xl border-2 border-brand-black bg-white p-5 sm:flex-row sm:items-start"
            >
              <img
                src={member.avatar_url}
                alt={`Zdjęcie: ${member.full_name}`}
                className="h-20 w-20 shrink-0 rounded-full border-2 border-brand-black object-cover"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-black">{member.full_name}</h2>
                {member.business_name ? (
                  <p className="text-sm font-bold text-brand-orange">
                    {member.business_name}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-brand-black/80">
                  {member.bio}
                </p>
                {member.business_url ? (
                  <a
                    href={member.business_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-sm underline hover:text-brand-orange"
                  >
                    {member.business_url}
                  </a>
                ) : null}
                <p className="mt-2 text-xs text-brand-black/50">
                  Zgłoszenie: {new Date(member.created_at).toLocaleString("pl-PL")}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">
                {member.status !== "approved" ? (
                  <button
                    onClick={() => updateStatus(member, "approved")}
                    className="rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-brand-cream transition-transform hover:scale-[1.03]"
                  >
                    Zatwierdź
                  </button>
                ) : null}
                {member.status !== "rejected" ? (
                  <button
                    onClick={() => updateStatus(member, "rejected")}
                    className="rounded-full border-2 border-brand-black px-5 py-2 text-sm font-bold transition-colors hover:bg-brand-lilac/50"
                  >
                    Odrzuć
                  </button>
                ) : null}
                <button
                  onClick={() => deleteMember(member)}
                  className="rounded-full border-2 border-brand-black/30 px-5 py-2 text-sm font-bold text-brand-black/60 transition-colors hover:border-brand-black hover:text-brand-black"
                >
                  Usuń
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-2xl border-2 border-brand-black/20 bg-white p-8 text-center text-brand-black/60">
            Brak zgłoszeń w kategorii „{FILTER_LABELS[filter]}".
          </p>
        )}
      </div>
    </div>
  );
}
