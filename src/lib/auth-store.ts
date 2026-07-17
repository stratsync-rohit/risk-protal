import { create } from "zustand";
import type { User } from "./types";

const TOKEN_STORAGE_KEY = "rs_token";
const USER_STORAGE_KEY = "rs_user";

export const isAllowedEmail = (email: string | null | undefined): email is string =>
  email?.trim().toLowerCase().endsWith("@stratsync.ai") === true;

function clearStoredAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

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
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const userRaw = localStorage.getItem(USER_STORAGE_KEY);
      if (token && userRaw) {
        const user = JSON.parse(userRaw) as User;
        if (isAllowedEmail(user.email)) {
          set({ token, user, hydrated: true });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    clearStoredAuth();
    set({ token: null, user: null, hydrated: true });
  },
  login: (user, token) => {
    if (!isAllowedEmail(user.email)) {
      clearStoredAuth();
      set({ user: null, token: null, hydrated: true });
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    set({ user, token, hydrated: true });
  },
  logout: () => {
    clearStoredAuth();
    set({ user: null, token: null });
  },
}));
