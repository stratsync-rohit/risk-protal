import type { User } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function loginUser(
  email: string,
  password: string,
): Promise<{ token: string; user: User }> {
  // MOCK — replace with real auth endpoint
  await delay(700);
  if (!email || !password) throw new Error("Email and password are required");
  if (password.length < 4) throw new Error("Invalid credentials");
  const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    token: "mock-token-" + Math.random().toString(36).slice(2),
    user: { email, name: name || "Analyst" },
  };
}

export async function sendToSlack(riskId: string): Promise<{ success: boolean }> {
  // MOCK — route through backend, never call Slack webhooks from the frontend.
  await delay(900);
  if (!riskId) throw new Error("Missing risk id");
  return { success: true };
}

export async function sendToTeams(riskId: string): Promise<{ success: boolean }> {
  // MOCK — route through backend, never call Teams webhooks from the frontend.
  await delay(900);
  if (!riskId) throw new Error("Missing risk id");
  return { success: true };
}
