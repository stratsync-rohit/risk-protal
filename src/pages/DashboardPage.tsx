import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, LoaderCircle, Package, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndustryCard } from "@/components/IndustryCard";
import { useRiskStore } from "@/lib/risk-store";

export function DashboardPage() {
  const navigate = useNavigate();
  const risks = useRiskStore((s) => s.risks);
  const isLoading = useRiskStore((s) => s.isLoading);
  const hasLoaded = useRiskStore((s) => s.hasLoaded);
  const error = useRiskStore((s) => s.error);
  const fetchRisks = useRiskStore((s) => s.fetchRisks);

  useEffect(() => {
    if (!hasLoaded) void fetchRisks();
  }, [fetchRisks, hasLoaded]);

  const count = (ind: string) =>
    risks.filter((r) => r.industry === ind && r.status !== "Sent").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Risk Analysis Portal
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Select Industry</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Choose a business unit to review active risks and route alerts to your incident response
          channels.
        </p>
      </div>

      {isLoading && (
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle className="h-4 w-4 animate-spin" /> Loading industry risks…
        </div>
      )}

      {error && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <span className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> {error}
          </span>
          <Button variant="outline" size="sm" onClick={() => void fetchRisks()}>
            Retry
          </Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <IndustryCard
          title="Distribution & Trading"
          description="Currency, credit, supplier and inventory exposures across your global trading operations."
          icon={Package}
          activeRisks={count("distribution-trading")}
          onClick={() =>
            navigate({ to: "/dashboard/$industry", params: { industry: "distribution-trading" } })
          }
        />
        <IndustryCard
          title="Ship Management"
          description="Fleet, port, maintenance and geopolitical risks affecting active voyages and charters."
          icon={Ship}
          activeRisks={count("ship-management")}
          onClick={() =>
            navigate({ to: "/dashboard/$industry", params: { industry: "ship-management" } })
          }
        />
      </div>
    </main>
  );
}
