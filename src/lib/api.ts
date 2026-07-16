const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
