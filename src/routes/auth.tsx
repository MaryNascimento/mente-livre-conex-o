import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MobileShell } from "@/components/MobileShell";
import { useUsuario, type Usuario } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar ou cadastrar — MenteLivre" },
      {
        name: "description",
        content: "Crie sua conta de paciente ou psicólogo no MenteLivre em poucos segundos.",
      },
      { property: "og:title", content: "Entrar ou cadastrar — MenteLivre" },
      {
        property: "og:description",
        content: "Conta de paciente ou psicólogo com nome, e-mail e senha.",
      },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const { setUsuario } = useUsuario();
  const [modo, setModo] = useState<"entrar" | "cadastrar">("cadastrar");
  const [tipo, setTipo] = useState<Usuario["tipo"]>("paciente");
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });

  return (
    <MobileShell>
      <section className="bg-calm-gradient px-5 pt-10 pb-6 sm:rounded-t-[2.25rem]">
        <h1 className="text-2xl font-semibold tracking-tight">
          {modo === "entrar" ? "Bem-vindo de volta" : "Crie sua conta"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acolhimento e cuidado a poucos toques de distância.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-background p-1 shadow-card">
          {(["cadastrar", "entrar"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModo(m)}
              className={`rounded-xl py-2 text-sm font-semibold transition-colors ${
                modo === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "entrar" ? "Entrar" : "Cadastrar"}
            </button>
          ))}
        </div>
      </section>

      <form
        className="space-y-4 px-5 pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setUsuario({
            nome: form.nome || (tipo === "paciente" ? "Paciente MenteLivre" : "Psicólogo(a)"),
            email: form.email,
            tipo,
          });
          toast.success(modo === "entrar" ? "Login realizado!" : "Conta criada com sucesso!");
          navigate({ to: "/perfil" });
        }}
      >
        {modo === "cadastrar" ? (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Tipo de conta</legend>
            <div className="grid grid-cols-2 gap-3">
              {(["paciente", "psicologo"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  className={`rounded-2xl border p-4 text-left text-sm font-semibold transition-colors ${
                    tipo === t
                      ? "border-primary bg-brand-soft text-primary"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {t === "paciente" ? "Paciente" : "Psicólogo"}
                  <span className="mt-1 block text-[11px] font-normal">
                    {t === "paciente" ? "Buscar atendimento" : "Receber pacientes"}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {modo === "cadastrar" ? (
          <Campo
            label="Nome completo"
            value={form.nome}
            onChange={(v) => setForm({ ...form, nome: v })}
            placeholder="Como podemos te chamar?"
          />
        ) : null}
        <Campo
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          placeholder="voce@email.com"
        />
        <Campo
          label="Senha"
          type="password"
          value={form.senha}
          onChange={(v) => setForm({ ...form, senha: v })}
          placeholder="Mínimo de 6 caracteres"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-card"
        >
          {modo === "entrar" ? "Entrar" : "Criar conta"}
        </button>
        <p className="pb-4 text-center text-xs text-muted-foreground">
          Protótipo demonstrativo — os dados ficam apenas neste dispositivo.
        </p>
      </form>
    </MobileShell>
  );
}

function Campo({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-ring"
      />
    </label>
  );
}
