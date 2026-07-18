import { useEffect, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiskCard } from "@/components/RiskCard";
import { Button } from "@/components/ui/button";
import { useRiskStore } from "@/lib/risk-store";
import { INDUSTRY_LABELS, type Industry, type Severity } from "@/lib/types";

type IndustryRisksPageProps = {
  industry: Industry;
};

export function IndustryRisksPage({ industry }: IndustryRisksPageProps) {
  const industryKey = industry;
  const risks = useRiskStore((s) => s.risks);
  const isLoading = useRiskStore((s) => s.isLoading);
  const hasLoaded = useRiskStore((s) => s.hasLoaded);
  const error = useRiskStore((s) => s.error);
  const fetchRisks = useRiskStore((s) => s.fetchRisks);
  const [severity, setSeverity] = useState<Severity | "all">("all");

  useEffect(() => {
    if (!hasLoaded) void fetchRisks();
  }, [fetchRisks, hasLoaded]);

  const filtered = useMemo(
    () =>
      risks
        .filter((r) => r.industry === industryKey)
        .filter((r) => (severity === "all" ? true : r.severity === severity)),
    [risks, industryKey, severity],
  );

  const label = INDUSTRY_LABELS[industryKey];

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

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{label} Risks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "risk" : "risks"} matching current filter.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Severity</span>
          <Select value={severity} onValueChange={(v) => setSeverity(v as Severity | "all")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          <Button className="mt-4" variant="outline" onClick={() => void fetchRisks()}>
            Retry
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ShieldOff className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold">No risks match this filter</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different severity or check back shortly.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((risk) => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>
      )}
    </main>
  );
}
