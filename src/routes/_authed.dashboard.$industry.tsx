import { createFileRoute, notFound } from "@tanstack/react-router";
import { IndustryRisksPage } from "@/pages/IndustryRisksPage";
import { INDUSTRY_LABELS, type Industry } from "@/lib/types";

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
  component: IndustryRoutePage,
});

function IndustryRoutePage() {
  const { industry } = Route.useParams();
  return <IndustryRisksPage industry={industry} />;
}
