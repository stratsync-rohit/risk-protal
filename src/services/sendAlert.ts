type ErrorPayload = {
  message?: string;
  detail?: string;
  error?: string;
};

export type AlertDestination = "teams" | "slack";

const VALID_CARD_IDS = new Set([
  "owner-funding-short",
  "dry-dock-budget",
  "revenue-to-cover",
  "supplier-reliability",
]);

export async function sendAlertToChannel(
  cardId: string,
  destination: AlertDestination,
): Promise<void> {
  const webhookUrl =" https://stratsync-n8n-e0emdce7dta6g6dz.southeastasia-01.azurewebsites.net/webhook-test/rrm-alert-click"
  console.log("Webhook URL:", webhookUrl); // Log the webhook URL for debugging

  if (!webhookUrl) {
    throw new Error("The alert webhook is not configured");
  }

  if (import.meta.env.DEV && !VALID_CARD_IDS.has(cardId)) {
    console.warn("Unexpected card_id sent to n8n:", cardId);
  }

  console.log("Sending alert for card_id:", cardId);
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ card_id: cardId, destination }),
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
