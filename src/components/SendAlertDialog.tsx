import { useState } from "react";
import { Loader2, MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { triggerAlert, type AlertChannel } from "@/lib/api";
import { useRiskStore } from "@/lib/risk-store";
import type { Risk } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  risk: Risk;
}

export function SendAlertDialog({ open, onOpenChange, risk }: Props) {
  const [loading, setLoading] = useState<AlertChannel | null>(null);
  const markSent = useRiskStore((s) => s.markSent);

  const send = async (channel: AlertChannel) => {
    setLoading(channel);
    try {
      const response = await triggerAlert(risk.id, channel);
      markSent(risk.id, channel);
      toast.success(
        response.message || `Alert sent to ${channel === "slack" ? "Slack" : "Microsoft Teams"}`,
      );
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send alert");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (!loading ? onOpenChange(o) : undefined)}>
      <DialogContent aria-describedby="send-alert-desc">
        <DialogHeader>
          <DialogTitle>Send Alert</DialogTitle>
          <DialogDescription id="send-alert-desc">
            Route <span className="font-medium text-foreground">{risk.title}</span> to your incident
            response channel.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-auto flex-col gap-2 border-border/70 py-5 hover:border-[#4A154B] hover:bg-[#4A154B]/5"
            onClick={() => send("slack")}
            disabled={loading !== null}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#4A154B] text-white">
              {loading === "slack" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <MessageSquare className="h-5 w-5" />
              )}
            </div>
            <div className="text-sm font-semibold">Send to Slack</div>
            <div className="text-xs text-muted-foreground">#risk-alerts channel</div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-2 border-border/70 py-5 hover:border-[#4B53BC] hover:bg-[#4B53BC]/5"
            onClick={() => send("teams")}
            disabled={loading !== null}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#4B53BC] text-white">
              {loading === "teams" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Users className="h-5 w-5" />
              )}
            </div>
            <div className="text-sm font-semibold">Send to MS Teams</div>
            <div className="text-xs text-muted-foreground">Risk Operations team</div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
