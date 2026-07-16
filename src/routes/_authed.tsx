import { useEffect } from "react";
import { createFileRoute, Navigate, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { isAllowedEmail, useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;

    const auth = useAuthStore.getState();
    if (!auth.hydrated) auth.hydrate();

    const { token, user } = useAuthStore.getState();
    if (!token || !isAllowedEmail(user?.email)) {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { token, user, hydrated, hydrate } = useAuthStore();

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!token || !isAllowedEmail(user?.email)) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  );
}
