import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  activeRisks: number;
  isLoading?: boolean;
  onClick: () => void;
}

export function IndustryCard({
  title,
  description,
  icon: Icon,
  activeRisks,
  isLoading = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left focus:outline-none"
    >
      <Card className="relative overflow-hidden rounded-xl border-border/70 p-6 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/10" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <Badge
            variant={activeRisks > 0 ? "destructive" : "secondary"}
            className="rounded-full font-medium"
          >
            {isLoading
              ? "Loading risks…"
              : `${activeRisks} Active ${activeRisks === 1 ? "Risk" : "Risks"}`}
          </Badge>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-6 flex items-center text-sm font-medium text-primary">
          Open dashboard
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Card>
    </button>
  );
}
