import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FileCheck2, Upload } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useUsuario, type Usuario } from "@/lib/store";
import logo from "@/assets/mentelivre-logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar ou cadastrar — MenteLivre" },
      {
        name: "description",
        content: "Crie sua conta de paciente com CPF ou de psicólogo com CRP e diploma no MenteLivre.",
      },
      { property: "og:title", content: "Entrar ou cadastrar — MenteLivre" },
      {
        property: "og:description",
        content: "Paciente entra com CPF; psicólogo com CRP e diploma para verificação.",
      },
    ],
  }),
  component: Auth,
});

function mascaraCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

function Auth() {
  const navigate = useNavigate();
  const { setUsuario } = useUsuario();
  const [modo, setModo] = useState<"entrar" | "cadastrar">("cadastrar");
  const [tipo, setTipo] = useState<Usuario["tipo"]>("paciente");
  const [form, setForm] = useState({ nome: "", email: "", senha: "", cpf: "", crp: "" });
  const [diploma, setDiploma] = useState<string>("");

  const ehPsicologo = tipo === "psicologo";

  return (
    <MobileShell>
      <section className="bg-turquoise px-6 pt-10 pb-9 text-center sm:rounded-t-[2.25rem]">
        <img
          src={logo}
          alt="MenteLivre — cérebro acolhido por duas mãos"
          width={816}
          height={816}
          className="mx-auto h-28 w-28 object-contain"
        />
        <p className="mt-2 font-display text-4xl leading-none text-primary-foreground">Mente</p>
        <p className="text-3xl font-bold tracking-[0.14em] text-primary">LIVRE</p>
        <p className="mt-3 text-sm text-aqua-foreground/80">
          Um espaço tranquilo para cuidar de você.
        </p>

        <div className="mx-auto mt-6 grid max-w-[280px] grid-cols-2 gap-1 rounded-full bg-background/70 p-1">
          {(["cadastrar", "entrar"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModo(m)}
              className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                modo === m ? "bg-primary text-primary-foreground" : "text-primary/70"
              }`}
            >
              {m === "entrar" ? "Entrar" : "Cadastrar"}
            </button>
          ))}
        </div>
      </section>

      <form
        className="space-y-4 px-6 pt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (ehPsicologo && modo === "cadastrar" && !diploma) {
            toast.error("Envie seu diploma para validarmos seu cadastro.");
            return;
          }
          setUsuario({
            nome: form.nome || (ehPsicologo ? "Psicólogo(a)" : "Paciente MenteLivre"),
            email: form.email,
            tipo,
            cpf: ehPsicologo ? undefined : form.cpf,
            crp: ehPsicologo ? form.crp : undefined,
            diploma: ehPsicologo ? diploma : undefined,
          });
          toast.success(modo === "entrar" ? "Que bom te ver de novo!" : "Conta criada com carinho!");
          navigate({ to: "/perfil" });
        }}
      >
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Tipo de conta</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["paciente", "psicologo"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-3xl border p-4 text-left text-sm font-semibold transition-colors ${
                  tipo === t
                    ? "border-primary bg-brand-soft text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {t === "paciente" ? "Paciente" : "Psicólogo"}
                <span className="mt-1 block text-[11px] font-normal">
                  {t === "paciente" ? "Buscar acolhimento" : "Receber pacientes"}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {modo === "cadastrar" ? (
          <Campo
            label="Nome completo"
            value={form.nome}
            onChange={(v) => setForm({ ...form, nome: v })}
            placeholder="Como podemos te chamar?"
          />
        ) : null}

        {ehPsicologo ? (
          <>
            <Campo
              label="CRP"
              value={form.crp}
              onChange={(v) => setForm({ ...form, crp: v })}
              placeholder="06/123456"
              inputMode="numeric"
            />
            {modo === "cadastrar" ? (
              <div>
                <span className="mb-1.5 block text-sm font-medium">Diploma</span>
                <label className="flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-primary/40 bg-brand-soft/50 px-4 py-4 text-sm">
                  {diploma ? (
                    <FileCheck2 className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Upload className="h-5 w-5 shrink-0 text-primary" />
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {diploma || "Enviar diploma (PDF, JPG ou PNG)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setDiploma(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Usamos o diploma e o CRP apenas para verificar seu registro profissional.
                </p>
              </div>
            ) : null}
          </>
        ) : (
          <Campo
            label="CPF"
            value={form.cpf}
            onChange={(v) => setForm({ ...form, cpf: mascaraCpf(v) })}
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        )}

        {modo === "cadastrar" ? (
          <Campo
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="voce@email.com"
          />
        ) : null}

        <Campo
          label="Senha"
          type="password"
          value={form.senha}
          onChange={(v) => setForm({ ...form, senha: v })}
          placeholder="Mínimo de 6 caracteres"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-card"
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
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        required
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-3xl border border-transparent bg-brand-soft/60 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:bg-card"
      />
    </label>
  );
}
