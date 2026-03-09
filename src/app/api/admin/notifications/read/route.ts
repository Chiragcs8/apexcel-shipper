import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { notificationId } = body;

    if (!notificationId) {
      return NextResponse.json({ success: false, message: "Notification id is required" }, { status: 400 });
    }

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

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return NextResponse.json({ success: false, message: "Notification not found" }, { status: 404 });
    }

    const updatedReceiverList = notification.receiverList.map((receiver) => {
      const directUserMatch = receiver.userId === currentAdmin.id;
      const adminTypeMatch =
        receiver.userType === "ADMIN" &&
        receiver.adminType === currentAdmin.adminType;

      if (directUserMatch || adminTypeMatch) {
        return {
          ...receiver,
          isRead: true,
          readAt: new Date(),
        };
      }

      return receiver;
    });

    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        receiverList: updatedReceiverList,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("ADMIN_NOTIFICATION_READ_ERROR", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}