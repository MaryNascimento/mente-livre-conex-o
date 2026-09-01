import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, Heart, LogOut, Pencil, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { iniciais, PSICOLOGOS } from "@/lib/mentelivre";
import { useFavoritos, useUsuario } from "@/lib/store";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — MenteLivre" },
      {
        name: "description",
        content: "Edite seus dados, veja favoritos e o histórico de consultas no MenteLivre.",
      },
      { property: "og:title", content: "Meu perfil — MenteLivre" },
      { property: "og:description", content: "Dados pessoais, favoritos e histórico de sessões." },
    ],
  }),
  component: Perfil,
});

const historico = [
  { psicologo: "Maria Oliveira", data: "12 de julho, 15h", status: "Realizada" },
  { psicologo: "Juliana Mendes", data: "28 de junho, 10h", status: "Realizada" },
  { psicologo: "Rafael Souza", data: "5 de junho, 19h", status: "Cancelada" },
];

function Perfil() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useUsuario();
  const { favoritos } = useFavoritos();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    if (usuario) setForm({ nome: usuario.nome, email: usuario.email });
  }, [usuario]);

  const favoritosLista = PSICOLOGOS.filter((p) => favoritos.includes(p.id));

  if (!usuario) {
    return (
      <MobileShell>
        <ScreenHeader titulo="Meu perfil" />
        <div className="px-5">
          <div className="rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Entre na sua conta para gerenciar seus dados, favoritos e consultas.
            </p>
            <Link
              to="/auth"
              className="mt-4 inline-block rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Entrar ou cadastrar
            </Link>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <section className="bg-calm-gradient px-5 pt-8 pb-6 sm:rounded-t-[2.25rem]">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-brand-gradient text-xl font-semibold text-primary-foreground">
            {iniciais(usuario.nome)}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold">{usuario.nome}</h1>
            <p className="truncate text-sm text-muted-foreground">{usuario.email}</p>
            <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
              {usuario.tipo === "paciente" ? "Paciente" : "Psicólogo"}
            </span>
          </div>
        </div>
      </section>

      <div className="space-y-6 px-5 pt-6 pb-4">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Dados pessoais</h2>
            <button
              type="button"
              onClick={() => setEditando((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
            >
              <Pencil className="h-3.5 w-3.5" /> {editando ? "Cancelar" : "Editar"}
            </button>
          </div>

          {editando ? (
            <form
              className="mt-3 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setUsuario({ ...usuario, nome: form.nome, email: form.email });
                setEditando(false);
                toast.success("Dados atualizados!");
              }}
            >
              <input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                aria-label="Nome"
                className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-label="E-mail"
                className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                Salvar alterações
              </button>
            </form>
          ) : (
            <div className="mt-3 space-y-2 rounded-2xl border border-border bg-card p-4 text-sm shadow-card">
              <p>
                <span className="text-muted-foreground">Nome: </span>
                {usuario.nome}
              </p>
              <p>
                <span className="text-muted-foreground">E-mail: </span>
                {usuario.email || "—"}
              </p>
              {usuario.cpf ? (
                <p>
                  <span className="text-muted-foreground">CPF: </span>
                  {usuario.cpf}
                </p>
              ) : null}
              {usuario.crp ? (
                <p>
                  <span className="text-muted-foreground">CRP: </span>
                  {usuario.crp}
                </p>
              ) : null}
              {usuario.diploma ? (
                <p>
                  <span className="text-muted-foreground">Diploma: </span>
                  {usuario.diploma}
                </p>
              ) : null}
            </div>

          )}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Favoritos</h2>
            <Link to="/favoritos" className="inline-flex items-center text-xs font-semibold text-primary">
              Ver todos <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {favoritosLista.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                Nenhum psicólogo favoritado ainda.
              </p>
            ) : (
              favoritosLista.map((p) => (
                <Link
                  key={p.id}
                  to="/psicologo/$id"
                  params={{ id: p.id }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card"
                >
                  <Heart className="h-4 w-4 shrink-0 text-primary" fill="currentColor" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.nome}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">R$ {p.preco}</span>
                </Link>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold">Histórico de consultas</h2>
          <div className="mt-3 space-y-2">
            {historico.map((h) => (
              <div
                key={h.data}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card"
              >
                <CalendarCheck className="h-4 w-4 shrink-0 text-aqua" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{h.psicologo}</p>
                  <p className="text-xs text-muted-foreground">{h.data}</p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => {
            setUsuario(null);
            toast("Você saiu da sua conta.");
            navigate({ to: "/" });
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-semibold text-muted-foreground"
        >
          <LogOut className="h-4 w-4" /> Sair da conta
        </button>
      </div>
    </MobileShell>
  );
}
