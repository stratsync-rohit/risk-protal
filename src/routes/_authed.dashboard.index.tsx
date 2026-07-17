import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/DashboardPage";

export const Route = createFileRoute("/_authed/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — RiskSentinel" }] }),
  component: DashboardPage,
});
