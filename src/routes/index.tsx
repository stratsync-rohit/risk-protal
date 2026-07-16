import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Bell, LayoutDashboard, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RiskSentinel — Real-time Risk Analysis Portal" },
      {
        name: "description",
        content:
          "Real-time risk detection and Slack / Teams alerting for Distribution & Trading and Ship Management operations.",
      },
      { property: "og:title", content: "RiskSentinel — Risk Analysis Portal" },
      {
        property: "og:description",
        content:
          "Monitor operational risk across trading desks and fleets, with instant alerting to Slack and Microsoft Teams.",
      },
    ],
  }),
  component: LandingPage,
});

const FEATURES = [
  {
    icon: Activity,
    title: "Real-time Risk Detection",
    body: "Continuous signal monitoring across trading, supply chain and fleet operations — surfaced the moment thresholds trip.",
  },
  {
    icon: Bell,
    title: "Instant Slack & Teams Alerts",
    body: "One-click routing of prioritized incidents to your on-call channels, with full audit trail and delivery status.",
  },
  {
    icon: LayoutDashboard,
    title: "Industry-specific Dashboards",
    body: "Purpose-built views for Distribution & Trading and Ship Management — no generic KPIs, just what your desk needs.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-tight">RiskSentinel</span>
        </div>
        <Button asChild variant="ghost">
          <Link to="/login">Sign in</Link>
        </Button>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live risk telemetry
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              Real-time risk monitoring for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                trading desks and fleets
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              RiskSentinel watches your Distribution &amp; Trading and Ship Management operations
              24/7, and routes prioritized alerts to Slack or Microsoft Teams the moment risk
              materializes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/login">
                  Access the portal
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">See capabilities</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="rounded-xl border-border/70 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} RiskSentinel. All rights reserved.</div>
          <div>Enterprise risk analysis portal</div>
        </div>
      </footer>
    </div>
  );
}
