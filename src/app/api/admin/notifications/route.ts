import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "unread";
    const limit = Number(searchParams.get("limit") || 10);

    const cookieHeader = request.headers.get("cookie") || "";
    const sessionCookie = cookieHeader
      .split("; ")
      .find((item) => item.startsWith("admin_session_id="));

    const sessionId = sessionCookie?.split("=")[1];

    if (!sessionId) {
      return NextResponse.json({ success: false, message: "No session found" }, { status: 401 });
    }

    const admins = await prisma.admin.findMany();

    const currentAdmin = admins.find((admin) =>
      admin.sessions?.some((session) => session.sessionId === sessionId && session.isActive)
    );

    if (!currentAdmin) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const allNotifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const filtered = allNotifications.filter((notification) => {
      if (notification.isDeleted) return false;

      const matchedReceiver = notification.receiverList.find((receiver) => {
        if (receiver.isDeleted) return false;

        const directUserMatch = receiver.userId === currentAdmin.id;
        const adminTypeMatch =
          receiver.userType === "ADMIN" &&
          receiver.adminType === currentAdmin.adminType;

        return directUserMatch || adminTypeMatch;
      });

      if (!matchedReceiver) return false;

      if (mode === "unread") return !matchedReceiver.isRead;

      return true;
    });

    const notifications = filtered.slice(0, limit).map((item) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      colorCode: item.colorCode || "#f97316",
      type: item.type,
      redirection: item.redirection || item.link || null,
      createdAt: item.createdAt,
    }));

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("ADMIN_NOTIFICATION_LIST_ERROR", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}