import { Link } from "@tanstack/react-router";
import { AlertCircle, LoaderCircle, ShieldOff } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { RiskCard } from "@/components/RiskCard";
import { useRiskCatalog } from "@/hooks/use-risk-catalog";
import type { IndustryKey } from "@/data/riskCatalog";

type IndustryRisksPageProps = {
  industry: IndustryKey;
};

export function IndustryRisksPage({ industry }: IndustryRisksPageProps) {
  const { catalog, isLoading, error, retry } = useRiskCatalog();
  const industryData = catalog?.[industry];
  const label =
    industryData?.label ??
    (industry === "ship-management" ? "Ship Management" : "Distribution & Trading");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{label}</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          {industryData?.description ?? "Review active operational risks and notify your team."}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-16 flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <LoaderCircle className="h-5 w-5 animate-spin" /> Loading risks…
        </div>
      ) : error ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 py-12 text-center">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <h3 className="mt-3 text-base font-semibold">Could not load industry risks</h3>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-4" variant="outline" onClick={() => void retry()}>
            Retry
          </Button>
        </div>
      ) : !industryData || industryData.risks.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ShieldOff className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold">No active risks</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no active risks for this industry right now.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          {industryData.risks.map((risk) => (
            <RiskCard key={risk.card_id} risk={risk} />
          ))}
        </div>
      )}
    </main>
  );
}
