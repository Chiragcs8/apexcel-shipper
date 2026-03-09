import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { compareHash } from "@/lib/auth/hash";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mobile = body?.mobile?.trim();
    const username = body?.username?.trim();
    const password = body?.password?.trim();

    if (!mobile || !username || !password) {
      return NextResponse.json(
        { success: false, message: "Mobile, username and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { mobileNumber: mobile },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "This mobile number is not registered as admin",
          nextStep: "NOT_ADMIN",
        },
        { status: 404 }
      );
    }

    if (admin.uid3 !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Invalid admin account" },
        { status: 403 }
      );
    }

    if (admin.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          message: `Admin account is ${admin.status}`,
          nextStep: "BLOCKED_OR_INACTIVE",
        },
        { status: 403 }
      );
    }

    if (admin.username !== username) {
      return NextResponse.json(
        { success: false, message: "Invalid username" },
        { status: 401 }
      );
    }

    const isPasswordValid = await compareHash(password, admin.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        history: {
          push: {
            action: "LOGIN_VALIDATE_SUCCESS",
            description: "Admin credentials validated successfully",
            createdAt: new Date(),
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Credentials validated successfully",
      nextStep: "OTP_REQUIRED",
      admin: {
        mobileNumber: admin.mobileNumber,
        username: admin.username,
        adminType: admin.adminType,
        designation: admin.designation,
      },
    });
  } catch (error) {
    console.error("ADMIN_LOGIN_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}