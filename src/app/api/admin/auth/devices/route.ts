import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  getCurrentAdminFromRequest,
  type AdminSessionType,
  type AdminWithEmbedded,
} from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";

type DeviceResponseItem = {
  sessionId: string;
  device: string | null;
  deviceType: string | null;
  deviceName: string | null;
  os: string | null;
  browser: string | null;
  ip: string | null;
  location: string | null;
  isCurrent: boolean;
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date | null;
  lastSeenAt: Date | null;
  canLogout: boolean;
};

function formatSessionForResponse(
  session: AdminSessionType,
  currentSessionId: string,
  canLogout: boolean
): DeviceResponseItem {
  return {
    sessionId: session.sessionId,
    device: session.device || null,
    deviceType: session.deviceType || null,
    deviceName: session.deviceName || null,
    os: session.os || null,
    browser: session.browser || null,
    ip: session.ip || null,
    location: session.location || null,
    isCurrent: session.sessionId === currentSessionId,
    isActive: session.isActive,
    createdAt: session.createdAt,
    expiresAt: session.expiresAt || null,
    lastSeenAt: session.lastSeenAt || null,
    canLogout,
  };
}

export async function GET(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin, sessionId } = auth;

    if (!hasPermission(currentAdmin.permissions, "logout.view:yes")) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have logout.view:yes permission.",
        },
        { status: 403 }
      );
    }

    const canLogoutOwnDevices = hasPermission(
      currentAdmin.permissions,
      "logout.edit:yes"
    );

    const ownDevices: DeviceResponseItem[] = (currentAdmin.sessions || [])
      .filter((session: AdminSessionType) => session.isActive)
      .map((session: AdminSessionType) =>
        formatSessionForResponse(session, sessionId, canLogoutOwnDevices)
      )
      .sort((a: DeviceResponseItem, b: DeviceResponseItem) => {
        const aTime = new Date(a.lastSeenAt || a.createdAt).getTime();
        const bTime = new Date(b.lastSeenAt || b.createdAt).getTime();
        return bTime - aTime;
      });

    let superior: {
      id: string;
      username: string;
      name: string;
      designation: string;
      adminType: string;
      devices: DeviceResponseItem[];
    } | null = null;

    if (currentAdmin.createdBy && currentAdmin.createdBy !== "system") {
      const allAdmins = (await prisma.admin.findMany()) as AdminWithEmbedded[];

      const matchedSuperior = allAdmins.find(
        (admin: AdminWithEmbedded) =>
          admin.username === currentAdmin.createdBy ||
          admin.uid4 === currentAdmin.createdBy ||
          admin.name === currentAdmin.createdBy
      );

      if (matchedSuperior) {
        superior = {
          id: matchedSuperior.id,
          username: matchedSuperior.username,
          name: matchedSuperior.name,
          designation: matchedSuperior.designation,
          adminType: matchedSuperior.adminType,
          devices: (matchedSuperior.sessions || [])
            .filter((session: AdminSessionType) => session.isActive)
            .map((session: AdminSessionType) =>
              formatSessionForResponse(session, sessionId, false)
            )
            .sort((a: DeviceResponseItem, b: DeviceResponseItem) => {
              const aTime = new Date(a.lastSeenAt || a.createdAt).getTime();
              const bTime = new Date(b.lastSeenAt || b.createdAt).getTime();
              return bTime - aTime;
            }),
        };
      }
    }

    return NextResponse.json({
      success: true,
      permissions: {
        canViewLogout: true,
        canLogoutOwnDevices,
      },
      ownDevices,
      superior,
    });
  } catch (error) {
    console.error("ADMIN_DEVICES_ERROR", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while loading devices.",
      },
      { status: 500 }
    );
  }
}