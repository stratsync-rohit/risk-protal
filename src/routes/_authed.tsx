import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
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
  component: AuthenticatedLayout,
});
