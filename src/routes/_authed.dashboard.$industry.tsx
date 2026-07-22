import { createFileRoute, notFound } from "@tanstack/react-router";
import { IndustryRisksPage } from "@/pages/IndustryRisksPage";
import { RISK_CATALOG, type IndustryKey } from "@/data/riskCatalog";

export const Route = createFileRoute("/_authed/dashboard/$industry")({
  parseParams: (params) => {
    if (params.industry !== "distribution-trading" && params.industry !== "ship-management") {
      throw notFound();
    }

    return { industry: params.industry as IndustryKey };
  },
  head: ({ params }) => {
    const label = RISK_CATALOG[params.industry as IndustryKey]?.label ?? "Risks";
    return { meta: [{ title: `${label} — RiskSentinel` }] };
  },
  component: IndustryRoutePage,
});

function IndustryRoutePage() {
  const { industry } = Route.useParams();
  return <IndustryRisksPage industry={industry} />;
}
