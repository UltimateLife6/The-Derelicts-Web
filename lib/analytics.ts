import type { AnalyticsEvent } from "@/types";

export function track(
  event: AnalyticsEvent,
  payload?: Record<string, unknown>,
) {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "1") return;
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("derelicts:analytics", { detail: { event, payload } }),
  );
}
