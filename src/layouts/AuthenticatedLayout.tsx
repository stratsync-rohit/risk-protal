import { useEffect } from "react";
import { Navigate, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { isAllowedEmail, useAuthStore } from "@/lib/auth-store";

export function AuthenticatedLayout() {
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
