export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function gaEvent(action: string, params?: Record<string, any>) {
  if (!GA_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, params || {});
}