import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Star, Users } from "lucide-react";
import { iniciais, type Psicologo } from "@/lib/mentelivre";
import { useFavoritos } from "@/lib/store";

export function PsicologoCard({ p }: { p: Psicologo }) {
  const { isFavorito, toggle } = useFavoritos();
  const fav = isFavorito(p.id);

  return (
    <article className="relative rounded-3xl border border-border bg-card p-4 shadow-card">
      <button
        type="button"
        aria-label={fav ? "Remover dos favoritos" : "Favoritar"}
        onClick={() => toggle(p.id)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-secondary/70 text-primary transition-colors hover:bg-secondary"
      >
        <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
      </button>

      <Link
        to="/psicologo/$id"
        params={{ id: p.id }}
        className="flex min-w-0 items-start gap-3 pr-10"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-3xl bg-turquoise text-lg font-semibold text-primary">
          {iniciais(p.nome)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold">{p.nome}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {p.especialidades.slice(0, 2).join(" • ")}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <Star className="h-3.5 w-3.5 text-aqua" fill="currentColor" /> {p.nota.toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {p.pacientes} pacientes
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {p.cidade}/{p.estado}
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex flex-wrap gap-1.5">
          {p.modalidades.map((m) => (
            <span
              key={m}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="text-sm font-semibold text-primary">R$ {p.preco}/sessão</p>
      </div>
    </article>
  );
}
