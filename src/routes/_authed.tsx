import { useEffect, useState } from "react";
import {
  createFileRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
});

function AuthedLayout() {
  const navigate = useNavigate();
  const { token, hydrated, hydrate } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setChecked(true);
  }, [hydrated, token, navigate]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  );
}
