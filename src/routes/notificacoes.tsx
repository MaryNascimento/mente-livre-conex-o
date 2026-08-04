import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarClock, Star } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações — MenteLivre" },
      {
        name: "description",
        content: "Lembretes das suas sessões agendadas com psicólogos do MenteLivre.",
      },
      { property: "og:title", content: "Notificações — MenteLivre" },
      { property: "og:description", content: "Lembretes de consultas e avisos importantes." },
    ],
  }),
  component: Notificacoes,
});

const avisos = [
  {
    icone: CalendarClock,
    titulo: "Sessão amanhã às 15h",
    texto: "Você possui uma sessão amanhã às 15h com Dra. Maria Oliveira.",
    quando: "Há 2 horas",
    novo: true,
  },
  {
    icone: Bell,
    titulo: "Confirme sua sessão",
    texto: "Dr. Rafael Souza aguarda a confirmação da sessão de sexta às 19h.",
    quando: "Ontem",
    novo: true,
  },
  {
    icone: Star,
    titulo: "Avalie seu atendimento",
    texto: "Como foi sua sessão com Juliana Mendes? Sua avaliação ajuda outros pacientes.",
    quando: "3 dias atrás",
    novo: false,
  },
];

function Notificacoes() {
  return (
    <MobileShell>
      <ScreenHeader titulo="Notificações" subtitulo="Lembretes das suas consultas" />
      <div className="space-y-3 px-5 pb-4">
        {avisos.map(({ icone: Icone, ...a }) => (
          <article
            key={a.titulo}
            className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                a.novo ? "bg-brand-soft text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icone className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">{a.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.texto}</p>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{a.quando}</p>
            </div>
          </article>
        ))}
      </div>
    </MobileShell>
  );
}
