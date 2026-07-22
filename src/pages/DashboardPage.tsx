import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, LoaderCircle, Package, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndustryCard } from "@/components/IndustryCard";
import { useRiskCatalog } from "@/hooks/use-risk-catalog";

export function DashboardPage() {
  const navigate = useNavigate();
  const { catalog, isLoading, error, retry } = useRiskCatalog();

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
          <Button variant="outline" size="sm" onClick={() => void retry()}>
            Retry
          </Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <IndustryCard
          title={catalog?.["distribution-trading"].label ?? "Distribution & Trading"}
          description={
            catalog?.["distribution-trading"].description ??
            "Currency, credit, supplier and inventory exposures across your global trading operations."
          }
          icon={Package}
          activeRisks={catalog?.["distribution-trading"].risks.length ?? 0}
          isLoading={isLoading}
          onClick={() =>
            navigate({ to: "/dashboard/$industry", params: { industry: "distribution-trading" } })
          }
        />
        <IndustryCard
          title={catalog?.["ship-management"].label ?? "Ship Management"}
          description={
            catalog?.["ship-management"].description ??
            "Fleet, port, maintenance and geopolitical risks affecting active voyages and charters."
          }
          icon={Ship}
          activeRisks={catalog?.["ship-management"].risks.length ?? 0}
          isLoading={isLoading}
          onClick={() =>
            navigate({ to: "/dashboard/$industry", params: { industry: "ship-management" } })
          }
        />
      </div>
    </main>
  );
}
