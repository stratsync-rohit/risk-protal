import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldOff } from "lucide-react";
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
import { useRiskStore } from "@/lib/risk-store";
import { INDUSTRY_LABELS, type Industry, type Severity } from "@/lib/types";

export const Route = createFileRoute("/_authed/dashboard/$industry")({
  parseParams: (params) => {
    if (params.industry !== "distribution-trading" && params.industry !== "ship-management") {
      throw notFound();
    }
    return { industry: params.industry as Industry };
  },
  head: ({ params }) => {
    const label = INDUSTRY_LABELS[params.industry as Industry] ?? "Risks";
    return { meta: [{ title: `${label} — RiskSentinel` }] };
  },
  component: IndustryRisksPage,
});

function IndustryRisksPage() {
  const { industry } = Route.useParams();
  const industryKey = industry as Industry;
  const risks = useRiskStore((s) => s.risks);
  const [severity, setSeverity] = useState<Severity | "all">("all");

  const filtered = useMemo(
    () =>
      risks
        .filter((r) => r.industry === industry)
        .filter((r) => (severity === "all" ? true : r.severity === severity)),
    [risks, industry, severity],
  );

  const label = INDUSTRY_LABELS[industry];

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

      {filtered.length === 0 ? (
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
