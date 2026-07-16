import { useState } from "react";
import { AlertTriangle, Clock, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Risk, Severity, RiskStatus } from "@/lib/types";
import { SendAlertDialog } from "./SendAlertDialog";

const severityStyles: Record<Severity, string> = {
  High: "bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400",
  Medium: "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400",
  Low: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
};

const statusStyles: Record<RiskStatus, string> = {
  New: "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400",
  Acknowledged: "bg-slate-500/10 text-slate-700 border-slate-500/30 dark:text-slate-300",
  Sent: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function RiskCard({ risk }: { risk: Risk }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="flex flex-col rounded-xl border-border/70 p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border",
              severityStyles[risk.severity],
            )}
          >
            <AlertTriangle className="h-4 w-4" />
          </div>
          <Badge variant="outline" className={cn("rounded-full", severityStyles[risk.severity])}>
            {risk.severity}
          </Badge>
        </div>
        <Badge variant="outline" className={cn("rounded-full", statusStyles[risk.status])}>
          {risk.status}
        </Badge>
      </div>

      <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight">{risk.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{risk.description}</p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        Detected {formatDate(risk.detectedAt)}
      </div>

      {risk.sentVia && risk.sentVia.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {risk.sentVia.map((c) => (
            <Badge key={c} variant="secondary" className="rounded-full text-[10px] uppercase">
              Sent to {c}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-5 flex-1" />
      <Button onClick={() => setOpen(true)} className="w-full">
        <Send className="mr-2 h-4 w-4" /> Send Alert
      </Button>

      <SendAlertDialog open={open} onOpenChange={setOpen} risk={risk} />
    </Card>
  );
}
