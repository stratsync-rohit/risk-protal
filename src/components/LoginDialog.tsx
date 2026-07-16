import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/auth-store";
import { getFirebaseAuthError, signInWithGoogle } from "@/lib/firebase-auth";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { user, token } = await signInWithGoogle(true);
      login(user, token);
      toast.success(`Welcome, ${user.name.split(" ")[0]}`);
      onOpenChange(false);
      navigate({ to: "/dashboard" });
    } catch (error) {
      const message = getFirebaseAuthError(error);
      setError(message);
      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back</DialogTitle>
          <DialogDescription>Sign in to access the risk analysis portal.</DialogDescription>
        </DialogHeader>

        <Button
          type="button"
          variant="outline"
          className="mt-2 h-11 w-full gap-3"
          disabled={googleLoading}
          onClick={onGoogleSignIn}
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z"
              />
              <path
                fill="#34A853"
                d="M12 22c2.7 0 4.98-.9 6.63-2.35l-3.25-2.55c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.63A10 10 0 0 0 12 22Z"
              />
              <path
                fill="#FBBC05"
                d="M6.39 13.93A6.02 6.02 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.44H3.04A10 10 0 0 0 2 12c0 1.64.39 3.19 1.04 4.56l3.35-2.63Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.94c1.47 0 2.79.5 3.82 1.49l2.88-2.88A9.66 9.66 0 0 0 12 2a10 10 0 0 0-8.96 5.44l3.35 2.63C7.18 7.7 9.39 5.94 12 5.94Z"
              />
            </svg>
          )}
          {googleLoading ? "Connecting to Google…" : "Continue with Google"}
        </Button>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Secure authentication powered by Google.
        </p>
      </DialogContent>
    </Dialog>
  );
}
