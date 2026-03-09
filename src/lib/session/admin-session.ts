import crypto from "crypto";

export function generateSessionId() {
  return crypto.randomUUID();
}

export function getSessionExpiryDate(days = 30) {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now;
}