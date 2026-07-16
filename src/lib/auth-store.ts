import { create } from "zustand";
import type { User } from "./types";

export const isAllowedEmail = (email: string | undefined) =>
  email?.trim().toLowerCase().endsWith("@stratsync.ai") === true;

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
        const user = JSON.parse(userRaw) as User;
        if (isAllowedEmail(user.email)) {
          set({ token, user, hydrated: true });
          return;
        }
        localStorage.removeItem("rs_token");
        localStorage.removeItem("rs_user");
      }
    } catch {
      /* ignore */
    }
    set({ hydrated: true });
  },
  login: (user, token) => {
    if (!isAllowedEmail(user.email)) {
      set({ user: null, token: null, hydrated: true });
      return;
    }
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
