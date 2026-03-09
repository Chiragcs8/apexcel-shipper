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
        { success: false, message: "You do not have permission to update TPIN." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword || "").trim();
    const newTpin = String(body.newTpin || "").trim();
    const confirmTpin = String(body.confirmTpin || "").trim();

    if (!currentPassword || !newTpin || !confirmTpin) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(newTpin)) {
      return NextResponse.json(
        { success: false, message: "TPIN must be exactly 6 digits." },
        { status: 400 }
      );
    }

    if (newTpin !== confirmTpin) {
      return NextResponse.json(
        { success: false, message: "Confirm TPIN does not match." },
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

    if (currentAdmin.tpinHash) {
      const isSameTpin = await compareHash(newTpin, currentAdmin.tpinHash);
      if (isSameTpin) {
        return NextResponse.json(
          { success: false, message: "New TPIN must be different from current TPIN." },
          { status: 400 }
        );
      }
    }

    const newTpinHash = await hashValue(newTpin);

    await prisma.admin.update({
      where: { id: currentAdmin.id },
      data: {
        tpinHash: newTpinHash,
        history: {
          push: {
            action: "TPIN_UPDATED",
            description: "Admin updated security TPIN",
            createdAt: new Date(),
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "TPIN updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE_TPIN_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating TPIN." },
      { status: 500 }
    );
  }
}