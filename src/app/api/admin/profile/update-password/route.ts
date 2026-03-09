import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentAdminFromRequest } from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";
import { compareHash, hashValue } from "@/lib/auth/hash";

export async function POST(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin } = auth;

    if (!hasPermission(currentAdmin.permissions, "edit_profile.edit:yes")) {
      return NextResponse.json(
        { success: false, message: "You do not have permission to update password." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword || "").trim();
    const newPassword = String(body.newPassword || "").trim();
    const confirmPassword = String(body.confirmPassword || "").trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Confirm password does not match." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, message: "New password must be different from current password." },
        { status: 400 }
      );
    }

    const isValidPassword = await compareHash(
      currentPassword,
      currentAdmin.passwordHash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect." },
        { status: 401 }
      );
    }

    const newPasswordHash = await hashValue(newPassword);

    await prisma.admin.update({
      where: { id: currentAdmin.id },
      data: {
        passwordHash: newPasswordHash,
        history: {
          push: {
            action: "PASSWORD_UPDATED",
            description: "Admin updated account password",
            createdAt: new Date(),
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE_PASSWORD_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating password." },
      { status: 500 }
    );
  }
}