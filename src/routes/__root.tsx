import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { AppLayout, DocumentShell } from "@/layouts/AppLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RiskSentinel — Risk Analysis Portal" },
      {
        name: "description",
        content:
          "Real-time risk detection and alerting for Distribution & Trading and Ship Management operations.",
      },
      { property: "og:title", content: "RiskSentinel — Risk Analysis Portal" },
      {
        property: "og:description",
        content:
          "Real-time risk detection and alerting for Distribution & Trading and Ship Management operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
  }),
  shellComponent: DocumentShell,
  component: AppLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});
