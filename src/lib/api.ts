import type { Industry, Risk, Severity } from "./types";

export const API_BASE_URL = "http://127.0.0.1:8000";

type ApiRisk = {
  risk_id: string;
  subject: string;
  severity: string;
};

type ApiIndustry = {
  name: string;
  risks: Record<string, ApiRisk>;
};

export type IndustriesResponse = {
  distribution_trading: ApiIndustry;
  ship_management: ApiIndustry;
};

const INDUSTRY_API_KEYS: Record<keyof IndustriesResponse, Industry> = {
  distribution_trading: "distribution-trading",
  ship_management: "ship-management",
};

function isSeverity(value: string): value is Severity {
  return value === "High" || value === "Medium" || value === "Low";
}

function formatRiskType(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getIndustryRisks(signal?: AbortSignal): Promise<Risk[]> {
  const response = await fetch(`${API_BASE_URL}/industries`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Unable to load industries (${response.status})`);
  }

  const industries = (await response.json()) as IndustriesResponse;

  return (Object.entries(INDUSTRY_API_KEYS) as [keyof IndustriesResponse, Industry][]).flatMap(
    ([apiKey, industry]) => {
      const apiIndustry = industries[apiKey];
      if (!apiIndustry?.risks) return [];

      return Object.entries(apiIndustry.risks).map(([riskType, risk]) => ({
        id: risk.risk_id,
        industry,
        title: formatRiskType(riskType),
        description: risk.subject,
        severity: isSeverity(risk.severity) ? risk.severity : "Medium",
        status: "New" as const,
      }));
    },
  );
}

export type AlertChannel = "slack" | "teams";

export type TriggerAlertResponse = {
  message: string;
  risk_id: string;
  industry: string;
  risk: string;
  channel: AlertChannel;
  n8n_response?: {
    raw_response?: string;
  };
};

export async function triggerAlert(
  riskId: string,
  channel: AlertChannel,
): Promise<TriggerAlertResponse> {
  if (!riskId) throw new Error("Missing risk id");

  const response = await fetch(`${API_BASE_URL}/trigger-alert`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ risk_id: riskId, channel }),
  });

  const payload = (await response.json().catch(() => null)) as
    | TriggerAlertResponse
    | {
        detail?: string;
        message?: string;
      }
    | null;

  if (!response.ok) {
    const errorMessage = payload && ("detail" in payload ? payload.detail : payload.message);
    throw new Error(errorMessage || `Failed to send alert (${response.status})`);
  }

  if (!payload || !("risk_id" in payload)) {
    throw new Error("Invalid response from alert service");
  }

  return payload;
}
