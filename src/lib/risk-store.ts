import { create } from "zustand";
import { getIndustryRisks } from "./api";
import type { Risk } from "./types";

interface RiskState {
  risks: Risk[];
  isLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
  fetchRisks: () => Promise<void>;
  markSent: (id: string, channel: "slack" | "teams") => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  risks: [],
  isLoading: false,
  hasLoaded: false,
  error: null,
  fetchRisks: async () => {
    const state = useRiskStore.getState();
    if (state.isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const risks = await getIndustryRisks();
      set({ risks, isLoading: false, hasLoaded: true });
    } catch (error) {
      set({
        isLoading: false,
        hasLoaded: true,
        error: error instanceof Error ? error.message : "Unable to load risks",
      });
    }
  },
  markSent: (id, channel) =>
    set((s) => ({
      risks: s.risks.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "Sent",
              sentVia: Array.from(new Set([...(r.sentVia ?? []), channel])),
            }
          : r,
      ),
    })),
}));
