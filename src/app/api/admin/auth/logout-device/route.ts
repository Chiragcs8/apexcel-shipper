import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  getCurrentAdminFromRequest,
  type AdminSessionType,
} from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";

export async function POST(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin, sessionId: currentSessionId } = auth;

    if (!hasPermission(currentAdmin.permissions, "logout.edit:yes")) {
      return NextResponse.json(
        { success: false, message: "You do not have logout.edit:yes permission." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const targetSessionId = body?.sessionId;

    if (!targetSessionId) {
      return NextResponse.json(
        { success: false, message: "sessionId is required." },
        { status: 400 }
      );
    }

    const ownSessionExists = (currentAdmin.sessions || []).some(
      (session: AdminSessionType) => session.sessionId === targetSessionId
    );

    if (!ownSessionExists) {
      return NextResponse.json(
        { success: false, message: "You can only logout your own devices." },
        { status: 403 }
      );
    }

    const updatedSessions = (currentAdmin.sessions || []).map(
      (session: AdminSessionType) => {
        if (session.sessionId === targetSessionId) {
          return {
            ...session,
            isActive: false,
            lastSeenAt: new Date(),
          };
        }
        return session;
      }
    );

    await prisma.admin.update({
      where: { id: currentAdmin.id },
      data: {
        sessions: updatedSessions,
        history: {
          push: {
            action: "LOGOUT_DEVICE",
            description:
              targetSessionId === currentSessionId
                ? "Current device logged out"
                : "Other device logged out",
            device: null,
            os: null,
            browser: null,
            ip: null,
            createdAt: new Date(),
          },
        },
      },
    });

    const isCurrentDevice = targetSessionId === currentSessionId;

    const response = NextResponse.json({
      success: true,
      message: isCurrentDevice
        ? "Current device logged out successfully."
        : "Device logged out successfully.",
      isCurrentDevice,
    });

    if (isCurrentDevice) {
      response.cookies.set("admin_session_id", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }

    return response;
  } catch (error) {
    console.error("ADMIN_LOGOUT_DEVICE_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while logging out device." },
      { status: 500 }
    );
  }
}