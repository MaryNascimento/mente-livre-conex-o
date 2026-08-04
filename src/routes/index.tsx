import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { PsicologoCard } from "@/components/PsicologoCard";
import { ESPECIALIDADES, PSICOLOGOS } from "@/lib/mentelivre";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MenteLivre — Encontre seu psicólogo ideal" },
      {
        name: "description",
        content:
          "MenteLivre conecta pacientes a psicólogos de todo o Brasil com filtros por especialidade, abordagem, modalidade e preço.",
      },
      { property: "og:title", content: "MenteLivre — Encontre seu psicólogo ideal" },
      {
        property: "og:description",
        content: "Busque psicólogos verificados por especialidade, abordagem, cidade e preço.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const destaques = [...PSICOLOGOS].sort((a, b) => b.nota - a.nota).slice(0, 3);

  return (
    <MobileShell>
      <section className="bg-brand-gradient px-5 pt-8 pb-10 text-primary-foreground sm:rounded-t-[2.25rem]">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/15">
            <Sparkles className="h-5 w-5" />
          </span>
          <p className="text-lg font-semibold tracking-tight">MenteLivre</p>
        </div>
        <h1 className="mt-5 text-[26px] leading-tight font-semibold">
          Cuidar da mente pode ser simples.
        </h1>
        <p className="mt-2 text-sm text-primary-foreground/85">
          Encontre o psicólogo certo para você, onde você estiver.
        </p>

        <form
          className="mt-5 flex items-center gap-2 rounded-2xl bg-background p-1.5 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/buscar", search: { q } });
          }}
        >
          <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome ou especialidade"
            aria-label="Buscar psicólogos"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
          >
            Buscar
          </button>
        </form>

        <Link
          to="/buscar"
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-3 text-sm font-semibold backdrop-blur"
        >
          Encontrar Psicólogo <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="px-5 pt-6">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground shadow-card">
          <ShieldCheck className="h-4 w-4 shrink-0 text-aqua" />
          Todos os profissionais possuem CRP verificado.
        </div>
      </section>

      <section className="pt-6">
        <h2 className="px-5 text-base font-semibold">Especialidades</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
          {ESPECIALIDADES.map((e) => (
            <Link
              key={e}
              to="/buscar"
              search={{ esp: e }}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-secondary-foreground shadow-card"
            >
              {e}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Psicólogos em destaque</h2>
          <Link to="/buscar" className="text-xs font-semibold text-primary">
            Ver todos
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {destaques.map((p) => (
            <PsicologoCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="px-5 pt-6 pb-2">
        <Link
          to="/auth"
          className="block rounded-2xl bg-accent p-4 text-sm font-medium text-accent-foreground"
        >
          É paciente ou psicólogo? Crie sua conta gratuita →
        </Link>
      </section>
    </MobileShell>
  );
}
