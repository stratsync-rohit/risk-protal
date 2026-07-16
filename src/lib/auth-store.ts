import { create } from "zustand";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const token = localStorage.getItem("rs_token");
      const userRaw = localStorage.getItem("rs_user");
      if (token && userRaw) {
        set({ token, user: JSON.parse(userRaw) as User, hydrated: true });
        return;
      }
    } catch {
      /* ignore */
    }
    set({ hydrated: true });
  },
  login: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rs_token", token);
      localStorage.setItem("rs_user", JSON.stringify(user));
    }
    set({ user, token, hydrated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rs_token");
      localStorage.removeItem("rs_user");
    }
    set({ user: null, token: null });
  },
}));
