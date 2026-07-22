type ErrorPayload = {
  message?: string;
  detail?: string;
  error?: string;
};

export async function sendAlertToTeams(cardId: string): Promise<void> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
 

  if (!webhookUrl) {
    throw new Error("The Teams alert webhook is not configured");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ card_id: cardId }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    let message = "";

    if (contentType.includes("application/json")) {
      const payload = (await response.json().catch(() => ({}))) as ErrorPayload;
      message = payload.message || payload.detail || payload.error || "";
    } else {
      message = await response.text().catch(() => "");
    }

    throw new Error(message || `Failed to send alert (${response.status})`);
  }
}
