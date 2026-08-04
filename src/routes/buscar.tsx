import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { PsicologoCard } from "@/components/PsicologoCard";
import {
  ABORDAGENS,
  ESPECIALIDADES,
  ESTADOS,
  FAIXAS,
  MODALIDADES,
  PSICOLOGOS,
  type Modalidade,
} from "@/lib/mentelivre";

type Busca = { q?: string; esp?: string };

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>): Busca => ({
    q: typeof search.q === "string" ? search.q : undefined,
    esp: typeof search.esp === "string" ? search.esp : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buscar psicólogos — MenteLivre" },
      {
        name: "description",
        content:
          "Filtre psicólogos por especialidade, abordagem terapêutica, modalidade, cidade e faixa de preço.",
      },
      { property: "og:title", content: "Buscar psicólogos — MenteLivre" },
      {
        property: "og:description",
        content: "Filtros personalizados para encontrar o profissional ideal.",
      },
    ],
  }),
  component: Buscar,
});

function Buscar() {
  const { q: qInicial, esp: espInicial } = Route.useSearch();
  const [q, setQ] = useState(qInicial ?? "");
  const [especialidades, setEspecialidades] = useState<string[]>(espInicial ? [espInicial] : []);
  const [abordagens, setAbordagens] = useState<string[]>([]);
  const [modalidade, setModalidade] = useState<Modalidade | null>(null);
  const [local, setLocal] = useState("");
  const [faixa, setFaixa] = useState<string | null>(null);
  const [filtrosAbertos, setFiltrosAbertos] = useState(true);

  const alternar = (lista: string[], set: (v: string[]) => void, valor: string) =>
    set(lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor]);

  const faixaSel = FAIXAS.find((f) => f.id === faixa);

  const resultados = PSICOLOGOS.filter((p) => {
    const termo = q.trim().toLowerCase();
    const casaTermo =
      !termo ||
      p.nome.toLowerCase().includes(termo) ||
      p.especialidades.some((e) => e.toLowerCase().includes(termo)) ||
      p.abordagem.toLowerCase().includes(termo);
    const casaEsp =
      especialidades.length === 0 || especialidades.some((e) => p.especialidades.includes(e));
    const casaAbord = abordagens.length === 0 || abordagens.includes(p.abordagem);
    const casaMod = !modalidade || p.modalidades.includes(modalidade);
    const casaLocal =
      modalidade !== "Presencial" ||
      !local.trim() ||
      `${p.cidade} ${p.estado}`.toLowerCase().includes(local.trim().toLowerCase());
    const casaPreco = !faixaSel || (p.preco >= faixaSel.min && p.preco <= faixaSel.max);
    return casaTermo && casaEsp && casaAbord && casaMod && casaLocal && casaPreco;
  });

  return (
    <MobileShell>
      <ScreenHeader
        titulo="Buscar psicólogos"
        subtitulo={`${resultados.length} profissionais encontrados`}
        acao={
          <button
            type="button"
            onClick={() => setFiltrosAbertos((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-card text-primary shadow-card"
            aria-label="Mostrar filtros"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        }
      />

      <div className="px-5">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-card">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Buscar"
            placeholder="Nome, especialidade ou abordagem"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {filtrosAbertos ? (
        <div className="mt-4 space-y-5 px-5">
          <Grupo titulo="Especialidade">
            {ESPECIALIDADES.map((e) => (
              <Chip
                key={e}
                ativo={especialidades.includes(e)}
                onClick={() => alternar(especialidades, setEspecialidades, e)}
              >
                {e}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Abordagem terapêutica">
            {ABORDAGENS.map((a) => (
              <Chip
                key={a}
                ativo={abordagens.includes(a)}
                onClick={() => alternar(abordagens, setAbordagens, a)}
              >
                {a}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Modalidade">
            {MODALIDADES.map((m) => (
              <Chip
                key={m}
                ativo={modalidade === m}
                onClick={() => setModalidade(modalidade === m ? null : m)}
              >
                {m}
              </Chip>
            ))}
          </Grupo>

          {modalidade === "Presencial" ? (
            <div>
              <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Estado ou cidade (ex.: SP, Recife)"
                aria-label="Estado ou cidade"
                className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {ESTADOS.map((uf) => (
                  <Chip key={uf} ativo={local === uf} onClick={() => setLocal(local === uf ? "" : uf)}>
                    {uf}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}

          <Grupo titulo="Faixa de preço">
            {FAIXAS.map((f) => (
              <Chip
                key={f.id}
                ativo={faixa === f.id}
                onClick={() => setFaixa(faixa === f.id ? null : f.id)}
              >
                {f.label}
              </Chip>
            ))}
          </Grupo>
        </div>
      ) : null}

      <div className="mt-6 space-y-3 px-5 pb-4">
        {resultados.map((p) => (
          <PsicologoCard key={p.id} p={p} />
        ))}
        {resultados.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Nenhum profissional encontrado com esses filtros.
          </p>
        ) : null}
      </div>
    </MobileShell>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold">{titulo}</h2>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        ativo
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-secondary-foreground"
      }`}
    >
      {children}
    </button>
  );
}
