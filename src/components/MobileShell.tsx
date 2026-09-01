import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, Bell, User } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/mentelivre-logo.png";


const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/notificacoes", label: "Avisos", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function MobileShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-secondary/40 py-0 sm:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background shadow-soft sm:min-h-[860px] sm:rounded-[2.25rem] sm:border sm:border-border">
        <main className="flex-1 overflow-hidden pb-24">{children}</main>
        <nav className="sticky bottom-0 z-20 border-t border-border bg-background/95 px-2 pt-2 pb-3 backdrop-blur sm:rounded-b-[2.25rem]">
          <ul className="grid grid-cols-5">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                        active ? "bg-brand-soft" : ""
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 1.9} />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function ScreenHeader({
  titulo,
  subtitulo,
  acao,
}: {
  titulo: string;
  subtitulo?: string;
  acao?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-turquoise px-5 pt-8 pb-6 sm:rounded-t-[2.25rem]">
      <img
        src={logo}
        alt="MenteLivre"
        width={816}
        height={816}
        className="h-12 w-12 shrink-0 object-contain"
      />
      <div className="min-w-0">
        <h1 className="truncate font-display text-2xl text-primary-foreground">{titulo}</h1>
        {subtitulo ? (
          <p className="mt-1 truncate text-sm text-aqua-foreground/80">{subtitulo}</p>
        ) : null}
      </div>
      {acao}
    </header>
  );
}

