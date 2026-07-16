import { create } from "zustand";
import { MOCK_RISKS } from "./mock-data";
import type { Risk } from "./types";

interface RiskState {
  risks: Risk[];
  markSent: (id: string, channel: "slack" | "teams") => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  risks: MOCK_RISKS,
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
