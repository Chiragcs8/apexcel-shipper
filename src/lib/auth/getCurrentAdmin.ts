import { prisma } from "@/lib/db/prisma";
import type { Admin } from "@prisma/client";

export type AdminSessionType = {
  sessionId: string;
  device?: string | null;
  deviceType?: string | null;
  deviceName?: string | null;
  os?: string | null;
  browser?: string | null;
  ip?: string | null;
  location?: string | null;
  isCurrent?: boolean | null;
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date | null;
  lastSeenAt?: Date | null;
};

export type AdminWithEmbedded = Admin & {
  sessions: AdminSessionType[];
};

export async function getCurrentAdminFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionCookie = cookieHeader
    .split("; ")
    .find((item: string) => item.startsWith("admin_session_id="));

  const sessionId = sessionCookie?.split("=")[1];

  if (!sessionId) {
    return null;
  }

  const admins = (await prisma.admin.findMany()) as AdminWithEmbedded[];

  const currentAdmin = admins.find((admin: AdminWithEmbedded) =>
    (admin.sessions || []).some(
      (session: AdminSessionType) =>
        session.sessionId === sessionId && session.isActive
    )
  );

  if (!currentAdmin) {
    return null;
  }

  if (currentAdmin.status !== "ACTIVE") {
    return null;
  }

  return {
    currentAdmin,
    sessionId,
  };
}