import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import {
  getCurrentAdminFromRequest,
  type AdminSessionType,
  type AdminWithEmbedded,
} from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";

type DeleteAccountBody = {
  tpin?: string;
  reason?: string;
};

export async function POST(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin, sessionId } = auth;

    if (!hasPermission(currentAdmin.permissions, "delete_account.edit:yes")) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have delete_account.edit:yes permission.",
        },
        { status: 403 }
      );
    }

    const body = (await request.json()) as DeleteAccountBody;
    const tpin = body.tpin?.trim();
    const reason = body.reason?.trim() || "Deleted by self";

    if (!tpin) {
      return NextResponse.json(
        { success: false, message: "TPIN is required." },
        { status: 400 }
      );
    }

    const freshAdmin = (await prisma.admin.findUnique({
      where: { id: currentAdmin.id },
    })) as AdminWithEmbedded | null;

    if (!freshAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found." },
        { status: 404 }
      );
    }

    if (!freshAdmin.tpinHash) {
      return NextResponse.json(
        { success: false, message: "TPIN is not configured for this account." },
        { status: 400 }
      );
    }

    const isValidTpin = await bcrypt.compare(tpin, freshAdmin.tpinHash);

    if (!isValidTpin) {
      return NextResponse.json(
        { success: false, message: "Invalid TPIN." },
        { status: 401 }
      );
    }

    const updatedSessions: AdminSessionType[] = (freshAdmin.sessions || []).map(
      (session: AdminSessionType) => ({
        ...session,
        isActive: false,
        isCurrent: false,
        lastSeenAt: new Date(),
        expiresAt: new Date(),
      })
    );

    await prisma.admin.update({
      where: { id: freshAdmin.id },
      data: {
        status: "DELETED",
        deletedAt: new Date(),
        deletedBy: freshAdmin.username,
        deleteReason: reason,
        sessions: updatedSessions,
        history: {
          push: {
            action: "ACCOUNT_DELETED",
            description: `Account soft deleted by self. Reason: ${reason}`,
            createdAt: new Date(),
          },
        },
        statusLogs: {
          push: {
            status: "DELETED",
            remark: reason,
            updatedBy: freshAdmin.username,
            updatedAt: new Date(),
          },
        },
      },
    });

    const response = NextResponse.json({
      success: true,
      message: "Account deleted successfully.",
      redirectTo: "/",
    });

    response.cookies.set("admin_session_id", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("ADMIN_DELETE_ACCOUNT_ERROR", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while deleting account.",
      },
      { status: 500 }
    );
  }
}