import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Risk Analysis Portal by Stratsync.ai" },
      {
        name: "description",
        content:
          "Real-time risk detection and Slack / Teams alerting for Distribution & Trading and Ship Management operations.",
      },
      { property: "og:title", content: "Risk Analysis Portal by Stratsync.ai" },
      {
        property: "og:description",
        content:
          "Monitor operational risk across trading desks and fleets, with instant alerting to Slack and Microsoft Teams.",
      },
    ],
  }),
  component: LandingPage,
});
