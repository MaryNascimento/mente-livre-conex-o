import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartOff } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { PsicologoCard } from "@/components/PsicologoCard";
import { PSICOLOGOS } from "@/lib/mentelivre";
import { useFavoritos } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — MenteLivre" },
      {
        name: "description",
        content: "Seus psicólogos favoritados, salvos para decidir com calma.",
      },
      { property: "og:title", content: "Favoritos — MenteLivre" },
      { property: "og:description", content: "Psicólogos que você salvou no MenteLivre." },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { favoritos } = useFavoritos();
  const lista = PSICOLOGOS.filter((p) => favoritos.includes(p.id));

  return (
    <MobileShell>
      <ScreenHeader titulo="Favoritos" subtitulo={`${lista.length} profissionais salvos`} />
      <div className="space-y-3 px-5 pb-4">
        {lista.map((p) => (
          <PsicologoCard key={p.id} p={p} />
        ))}
        {lista.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center">
            <HeartOff className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              Você ainda não favoritou nenhum psicólogo.
            </p>
            <Link
              to="/buscar"
              className="mt-4 inline-block rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Buscar psicólogos
            </Link>
          </div>
        ) : null}
      </div>
    </MobileShell>
  );
}
