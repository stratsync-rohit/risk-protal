import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { sendAlertToTeams } from "@/services/sendAlert";
import type { CatalogRisk, MetricStatus, RiskSeverity } from "@/data/riskCatalog";

const severityStyles: Record<RiskSeverity, string> = {
  high: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  critical: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
};

const metricStyles: Record<MetricStatus, string> = {
  critical: "border-red-500/20 bg-red-500/5",
  neutral: "border-border/70 bg-muted/35",
};

export function RiskCard({ risk }: { risk: CatalogRisk }) {
  const [isSending, setIsSending] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  const send = async () => {
    setIsSending(true);

    try {
      await sendAlertToTeams(risk.card_id);
      setWasSent(true);
      toast.success("Sent to Teams", {
        description: `${risk.riskId} was delivered to Microsoft Teams.`,
      });
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Failed to send alert");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-xl border-border/70 p-0 transition-shadow hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                severityStyles[risk.severity],
              )}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-snug tracking-tight sm:text-lg">
                {risk.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{risk.subtitle}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn("shrink-0 rounded-full capitalize", severityStyles[risk.severity])}
          >
            {risk.severity}
          </Badge>
        </div>

        <p className="mt-5 max-w-5xl text-sm leading-6 text-muted-foreground">{risk.summary}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {risk.metrics.map((metric) => (
            <div
              key={metric.label}
              className={cn("rounded-lg border px-4 py-3", metricStyles[metric.status])}
            >
              <div className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                {metric.label}
              </div>
              <div
                className={cn(
                  "mt-1 text-sm font-semibold",
                  metric.status === "critical" && "text-red-600 dark:text-red-400",
                )}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-muted/20 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="font-mono">{risk.riskId}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Detected {risk.detectedAt}
          </span>
        </div>
        <Button onClick={() => void send()} disabled={isSending} className="min-w-32">
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
            </>
          ) : wasSent ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Send Again
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send Alert
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
