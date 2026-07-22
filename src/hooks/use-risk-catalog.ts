import { useCallback, useEffect, useState } from "react";
import type { RISK_CATALOG } from "@/data/riskCatalog";

type RiskCatalog = typeof RISK_CATALOG;

export function useRiskCatalog() {
  const [catalog, setCatalog] = useState<RiskCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { RISK_CATALOG: loadedCatalog } = await import("@/data/riskCatalog");
      setCatalog(loadedCatalog);
    } catch (cause) {
      setCatalog(null);
      setError(cause instanceof Error ? cause.message : "Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { catalog, error, isLoading, retry: load };
}
