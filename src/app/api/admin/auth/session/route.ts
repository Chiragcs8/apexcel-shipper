import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sanitizeAdmin } from "@/lib/auth/admin-permissions";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/admin_session_id=([^;]+)/);
    const sessionId = sessionMatch?.[1];

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "No session found" },
        { status: 401 }
      );
    }

    const admins = await prisma.admin.findMany();

    const admin = admins.find((item) =>
      item.sessions?.some(
        (session) =>
          session.sessionId === sessionId &&
          session.isActive === true &&
          (!session.expiresAt || new Date(session.expiresAt) > new Date())
      )
    );

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: sanitizeAdmin(admin),
    });
  } catch (error) {
    console.error("ADMIN_SESSION_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}