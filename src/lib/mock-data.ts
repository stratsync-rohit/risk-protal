import type { Risk } from "./types";

export const MOCK_RISKS: Risk[] = [
  {
    id: "dt-1",
    industry: "distribution-trading",
    title: "Currency Fluctuation Exposure",
    description:
      "USD/EUR volatility over the last 24h has exceeded the 2.5% threshold on 3 open forward contracts. Potential mark-to-market impact of $128K.",
    severity: "High",
    detectedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    status: "New",
  },
  {
    id: "dt-2",
    industry: "distribution-trading",
    title: "Supplier Default Risk",
    description:
      "Credit score for Supplier #A-2241 dropped by 18 points this week. Two overdue invoices flagged in the last 10 days.",
    severity: "Medium",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "Acknowledged",
  },
  {
    id: "dt-3",
    industry: "distribution-trading",
    title: "Inventory Shortage Alert",
    description:
      "SKU-88213 projected to stock out in 6 days based on current velocity. No open replenishment PO detected.",
    severity: "Low",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: "New",
  },
  {
    id: "sm-1",
    industry: "ship-management",
    title: "Port Congestion Delay",
    description:
      "MV Northern Star ETA to Singapore delayed by 36h due to berth congestion. Downstream charter obligations at risk.",
    severity: "High",
    detectedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    status: "New",
  },
  {
    id: "sm-2",
    industry: "ship-management",
    title: "Piracy Risk Zone Alert",
    description:
      "Vessel MV Aurora entering high-risk transit corridor in the Gulf of Aden within 12h. Recommend armed escort protocol.",
    severity: "High",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "Acknowledged",
  },
  {
    id: "sm-3",
    industry: "ship-management",
    title: "Vessel Maintenance Overdue",
    description:
      "MV Helios main engine overhaul is 14 days past scheduled interval. Class society notification window closing soon.",
    severity: "Medium",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    status: "New",
  },
];
