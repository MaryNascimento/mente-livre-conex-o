import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { iniciais, PSICOLOGOS } from "@/lib/mentelivre";
import { useFavoritos } from "@/lib/store";

export const Route = createFileRoute("/psicologo/$id")({
  loader: ({ params }) => {
    const p = PSICOLOGOS.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Perfil indisponível — MenteLivre" }, { name: "robots", content: "noindex" }] };
    }
    const { p } = loaderData;
    const desc = `${p.nome} — ${p.abordagem}, ${p.especialidades.join(", ")}. R$ ${p.preco} por sessão em ${p.cidade}/${p.estado}.`;
    return {
      meta: [
        { title: `${p.nome} — Psicólogo(a) no MenteLivre` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.nome} — Psicólogo(a) no MenteLivre` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: PerfilPsicologo,
});

function PerfilPsicologo() {
  const { p } = Route.useLoaderData();
  const { isFavorito, toggle } = useFavoritos();
  const fav = isFavorito(p.id);

  return (
    <MobileShell>
      <section className="bg-brand-gradient px-5 pt-6 pb-8 text-primary-foreground sm:rounded-t-[2.25rem]">
        <div className="flex items-center justify-between">
          <Link
            to="/buscar"
            aria-label="Voltar"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label="Favoritar"
            onClick={() => toggle(p.id)}
            className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/15"
          >
            <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-5 flex min-w-0 items-center gap-4">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-primary-foreground/20 text-2xl font-semibold">
            {iniciais(p.nome)}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold">{p.nome}</h1>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary-foreground/90">
              <BadgeCheck className="h-4 w-4" /> CRP {p.crp} · verificado
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary-foreground/90">
              <MapPin className="h-3.5 w-3.5" /> {p.cidade}/{p.estado}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Metrica valor={p.nota.toFixed(1)} rotulo="Avaliação" icone={<Star className="h-3.5 w-3.5" />} />
          <Metrica valor={`${p.pacientes}`} rotulo="Pacientes" icone={<Users className="h-3.5 w-3.5" />} />
          <Metrica valor={`${p.anos} anos`} rotulo="Atuação" icone={<Clock className="h-3.5 w-3.5" />} />
        </div>
      </section>

      <div className="space-y-6 px-5 pt-6 pb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{p.bio}</p>

        <Bloco titulo="Formação e especializações">
          <p className="text-sm">{p.formacao}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {p.especializacoes.map((e) => (
              <li key={e}>• {e}</li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Abordagem e especialidades">
          <div className="flex flex-wrap gap-2">
            <Tag destaque>{p.abordagem}</Tag>
            {p.especialidades.map((e) => (
              <Tag key={e}>{e}</Tag>
            ))}
          </div>
        </Bloco>

        <Bloco titulo="Atendimento">
          <div className="flex flex-wrap gap-2">
            {p.modalidades.map((m) => (
              <Tag key={m}>{m}</Tag>
            ))}
          </div>
          <p className="mt-3 text-sm">
            Valor da sessão:{" "}
            <span className="font-semibold text-primary">R$ {p.preco}</span>
          </p>
        </Bloco>

        <Bloco titulo="Horários disponíveis">
          <div className="flex flex-wrap gap-2">
            {p.horarios.map((h) => (
              <Tag key={h}>{h}</Tag>
            ))}
          </div>
        </Bloco>

        <Bloco titulo={`Avaliações (${p.comentarios.length})`}>
          <div className="space-y-3">
            {p.comentarios.map((c) => (
              <div key={c.autor} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{c.autor}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3.5 w-3.5 text-aqua" fill="currentColor" /> {c.nota}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.texto}</p>
              </div>
            ))}
          </div>
        </Bloco>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
        <a
          href={`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(
            `Olá, ${p.nome}! Vim pelo MenteLivre e gostaria de agendar uma sessão.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-aqua py-3.5 text-sm font-semibold text-aqua-foreground shadow-card"
        >
          <MessageCircle className="h-4 w-4" /> Entrar em contato pelo WhatsApp
        </a>
      </div>
    </MobileShell>
  );
}

function Metrica({ valor, rotulo, icone }: { valor: string; rotulo: string; icone: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-primary-foreground/15 py-2.5">
      <p className="flex items-center justify-center gap-1 text-sm font-semibold">
        {icone} {valor}
      </p>
      <p className="text-[11px] text-primary-foreground/80">{rotulo}</p>
    </div>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold">{titulo}</h2>
      {children}
    </section>
  );
}

function Tag({ children, destaque }: { children: React.ReactNode; destaque?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
        destaque ? "bg-brand-soft text-primary" : "bg-secondary text-secondary-foreground"
      }`}
    >
      {children}
    </span>
  );
}
