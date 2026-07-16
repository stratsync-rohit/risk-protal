import { createFileRoute, useNavigate, Outlet, useMatches } from "@tanstack/react-router";
import { Package, Ship } from "lucide-react";
import { IndustryCard } from "@/components/IndustryCard";
import { useRiskStore } from "@/lib/risk-store";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — RiskSentinel" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const matches = useMatches();
  const hasChild = matches.some((m) => m.routeId === "/_authed/dashboard/$industry");
  if (hasChild) return <Outlet />;
  const navigate = useNavigate();
  const risks = useRiskStore((s) => s.risks);
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
