export type RiskSeverity = "high" | "critical";
export type MetricStatus = "critical" | "neutral";

export type RiskMetric = {
  label: string;
  value: string;
  status: MetricStatus;
};

export type CatalogRisk = {
  card_id: string;
  title: string;
  severity: RiskSeverity;
  subtitle: string;
  summary: string;
  metrics: readonly RiskMetric[];
  riskId: string;
  detectedAt: string;
};

export type RiskCatalogIndustry = {
  label: string;
  description: string;
  risks: readonly CatalogRisk[];
};

export const RISK_CATALOG = {
  "ship-management": {
    label: "Ship Management",
    description:
      "Fleet, port, maintenance and geopolitical risks affecting active voyages and charters.",
    risks: [
      {
        card_id: "owner-funding-short",
        title: "Owner funding is short",
        severity: "high",
        subtitle: "V-OP-2417 · MV Ocean Pioneer",
        summary:
          "The owner needs to send US$210,000 more by 15 August 2026. Without it, the vessel cannot pay suppliers and crew on time.",
        metrics: [
          { label: "FUNDING SHORTFALL", value: "US$210,000", status: "critical" },
          { label: "PAYMENTS AT RISK", value: "US$210,000", status: "critical" },
          { label: "DEADLINE", value: "15 Aug 2026", status: "neutral" },
          { label: "ACCOUNT RISK", value: "High", status: "critical" },
        ],
        riskId: "RSK-OP-0821",
        detectedAt: "08:15 IST",
      },
      {
        card_id: "dry-dock-budget",
        title: "Dry dock budget and schedule at risk",
        severity: "critical",
        subtitle: "V-DD-1189 · MT Pacific Horizon",
        summary:
          "Extra work has pushed the dry dock US$270,000 over budget and 5 to 7 days behind. Scope, owner approval and funding must be closed by 28 August 2026.",
        metrics: [
          { label: "BUDGET OVERRUN", value: "US$270,000", status: "critical" },
          { label: "EXTRA FUNDING NEEDED", value: "US$450,000", status: "critical" },
          { label: "SCHEDULE DELAY", value: "5 to 7 days", status: "neutral" },
          { label: "CONTRACT RISK", value: "Critical", status: "critical" },
        ],
        riskId: "RSK-DD-0904",
        detectedAt: "08:15 IST",
      },
    ],
  },
  "distribution-trading": {
    label: "Distribution & Trading",
    description:
      "Currency, credit, supplier and inventory exposures across your global trading operations.",
    risks: [
      {
        card_id: "revenue-to-cover",
        title: "Potential To-Cover Risk Discovered",
        severity: "high",
        subtitle: "SKU 21132 · Burberry XYZ Perfume for Men",
        summary:
          "Pending sales orders have increased over the last few weeks, and current stock plus consignment plus confirmed PO cover is not enough to meet these pending sales orders.",
        metrics: [
          { label: "REVENUE AT RISK", value: "$130,000", status: "critical" },
          { label: "CUSTOMERS IMPACTED", value: "5", status: "neutral" },
          { label: "TIER 1 CUSTOMERS IMPACTED", value: "3", status: "neutral" },
          { label: "ITEM KEYNESS", value: "High", status: "neutral" },
        ],
        riskId: "RSK-21132-0472",
        detectedAt: "9:42 AM IST",
      },
      {
        card_id: "supplier-reliability",
        title: "Supplier Reliability Risk Detected",
        severity: "high",
        subtitle: "SKU 88421 · Lavender Body Mist 100ml",
        summary:
          "Supplier A3 has missed recent dispatch commitments and cancellation rate is rising. Review supplier allocation before placing the next order.",
        metrics: [
          { label: "REVENUE EXPOSURE", value: "$84,000", status: "critical" },
          { label: "OPEN SUPPLIER POS", value: "12", status: "neutral" },
          { label: "SUPPLIER RISK LEVEL", value: "High", status: "critical" },
          { label: "ITEM KEYNESS", value: "Key", status: "neutral" },
        ],
        riskId: "RSK-88421-0318",
        detectedAt: "9:42 AM IST",
      },
    ],
  },
} as const satisfies Record<string, RiskCatalogIndustry>;

export type IndustryKey = keyof typeof RISK_CATALOG;
