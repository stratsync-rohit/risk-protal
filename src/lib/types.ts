export type Severity = "High" | "Medium" | "Low";
export type RiskStatus = "New" | "Acknowledged" | "Sent";
export type Industry = "distribution-trading" | "ship-management";

export interface Risk {
  id: string;
  industry: Industry;
  title: string;
  description: string;
  severity: Severity;
  detectedAt: string;
  status: RiskStatus;
  sentVia?: ("slack" | "teams")[];
}

export interface User {
  email: string;
  name: string;
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  "distribution-trading": "Distribution & Trading",
  "ship-management": "Ship Management",
};
