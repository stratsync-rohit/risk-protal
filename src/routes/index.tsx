import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Bell, LayoutDashboard, ArrowRight } from "lucide-react";
import { LoginDialog } from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Risk Analysis Portal logo"
              className="h-9 w-9 rounded-lg object-contain shadow-sm"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Risk Analysis Portal</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                By Stratsync.ai
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => setLoginOpen(true)}
          >
            Sign in
          </Button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-20 opacity-80"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 72%)",
            }}
          />
          <div className="landing-float pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="landing-float pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-primary/8 blur-3xl [animation-delay:-3s]" />

          <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
            <div className="landing-reveal inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live risk telemetry
            </div>
            <h1 className="landing-reveal landing-delay-1 mt-7 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Real-time risk monitoring for{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                trading desks and fleets
              </span>
            </h1>
            <p className="landing-reveal landing-delay-2 mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Monitor Distribution &amp; Trading and Ship Management operations 24/7, then route
              prioritized alerts to Slack or Microsoft Teams the moment risk materializes.
            </p>
            <div className="landing-reveal landing-delay-3 mt-10 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="group h-11 px-6 shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20"
                onClick={() => setLoginOpen(true)}
              >
                Access the portal
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button asChild size="lg" variant="outline">
                <a className="h-11 bg-background/60 px-6 backdrop-blur" href="#features">
                  See capabilities
                </a>
              </Button>
            </div>

            <div className="landing-reveal landing-delay-4 mx-auto mt-16 grid max-w-3xl grid-cols-1 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ["24/7", "Continuous monitoring"],
                ["Instant", "Slack & Teams alerts"],
                ["2", "Industry workspaces"],
              ].map(([value, label]) => (
                <div key={label} className="px-6 py-4">
                  <div className="text-lg font-semibold tracking-tight">{value}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 px-6 pb-28 pt-6 sm:pt-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Built for operational clarity
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              See risk sooner. Act with confidence.
            </h2>
          </div>
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="group rounded-2xl border-border/70 bg-card/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <div>
            © {new Date().getFullYear()} Risk Analysis Portal by Stratsync.ai. All rights reserved.
          </div>
          <div>Enterprise risk analysis portal</div>
        </div>
      </footer>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
