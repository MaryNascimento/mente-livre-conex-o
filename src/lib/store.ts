import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "mentelivre:favoritos";
const USER_KEY = "mentelivre:usuario";

export type Usuario = {
  nome: string;
  email: string;
  tipo: "paciente" | "psicologo";
  cpf?: string;
  crp?: string;
  diploma?: string;
};


function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    setFavoritos(read<string[]>(FAV_KEY, []));
    const onSync = () => setFavoritos(read<string[]>(FAV_KEY, []));
    window.addEventListener("mentelivre:favoritos", onSync);
    return () => window.removeEventListener("mentelivre:favoritos", onSync);
  }, []);

  const toggle = useCallback((id: string) => {
    const atuais = read<string[]>(FAV_KEY, []);
    const novos = atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id];
    window.localStorage.setItem(FAV_KEY, JSON.stringify(novos));
    window.dispatchEvent(new Event("mentelivre:favoritos"));
  }, []);

  return { favoritos, toggle, isFavorito: (id: string) => favoritos.includes(id) };
}

export function useUsuario() {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);

  useEffect(() => {
    setUsuarioState(read<Usuario | null>(USER_KEY, null));
    const onSync = () => setUsuarioState(read<Usuario | null>(USER_KEY, null));
    window.addEventListener("mentelivre:usuario", onSync);
    return () => window.removeEventListener("mentelivre:usuario", onSync);
  }, []);

  const setUsuario = useCallback((u: Usuario | null) => {
    if (u) window.localStorage.setItem(USER_KEY, JSON.stringify(u));
    else window.localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("mentelivre:usuario"));
  }, []);

  return { usuario, setUsuario };
}
