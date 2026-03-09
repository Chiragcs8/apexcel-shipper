import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateOtp } from "@/lib/otp/generateOtp";
import { compareHash, hashValue } from "@/lib/auth/hash";
import { generateSessionId, getSessionExpiryDate } from "@/lib/session/admin-session";
import { sanitizeAdmin } from "@/lib/auth/admin-permissions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body?.action?.trim();
    const mobile = body?.mobile?.trim();

    if (!action || !mobile) {
      return NextResponse.json(
        { success: false, message: "Action and mobile are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { mobileNumber: mobile },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    if (admin.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: `Admin account is ${admin.status}` },
        { status: 403 }
      );
    }

    if (action === "send") {
      const channel = body?.channel?.trim() || "EMAIL";

      const allowedChannels = ["EMAIL", "SMS", "WHATSAPP"];
      if (!allowedChannels.includes(channel)) {
        return NextResponse.json(
          { success: false, message: "Invalid OTP channel" },
          { status: 400 }
        );
      }

      const otp = generateOtp();
      const otpHash = await hashValue(otp);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          currentOtpHash: otpHash,
          currentOtpChannel: channel,
          currentOtpExpiresAt: expiresAt,
          otpAttemptCount: 0,
          lastOtpSentAt: new Date(),
          otpHistory: {
            push: {
              otpHash,
              channel,
              status: "SENT",
              createdAt: new Date(),
              expiresAt,
            },
          },
          history: {
            push: {
              action: "OTP_SENT",
              description: `OTP sent via ${channel}`,
              createdAt: new Date(),
            },
          },
        },
      });

      console.log(`✅ MOCK ADMIN OTP for ${mobile}: ${otp} via ${channel}`);

      return NextResponse.json({
        success: true,
        message: `OTP sent via ${channel}`,
        nextStep: "ENTER_OTP",
        channel,
        retryAfter: 60,
        expiresIn: 300,
        supportEmail: "tech@apexcelmove.com",
      });
    }

    if (action === "verify") {
      const otp = body?.otp?.trim();

      if (!otp) {
        return NextResponse.json(
          { success: false, message: "OTP is required" },
          { status: 400 }
        );
      }

      if (!admin.currentOtpHash || !admin.currentOtpExpiresAt) {
        return NextResponse.json(
          { success: false, message: "No active OTP found" },
          { status: 400 }
        );
      }

      if (new Date() > new Date(admin.currentOtpExpiresAt)) {
        return NextResponse.json(
          { success: false, message: "OTP expired" },
          { status: 400 }
        );
      }

      const isOtpValid = await compareHash(otp, admin.currentOtpHash);

      if (!isOtpValid) {
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            otpAttemptCount: { increment: 1 },
            history: {
              push: {
                action: "OTP_VERIFY_FAILED",
                description: "Invalid OTP entered",
                createdAt: new Date(),
              },
            },
          },
        });

        return NextResponse.json(
          { success: false, message: "Invalid OTP" },
          { status: 401 }
        );
      }

      const sessionId = generateSessionId();
      const expiresAt = getSessionExpiryDate(30);

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          currentOtpHash: null,
          currentOtpChannel: null,
          currentOtpExpiresAt: null,
          otpAttemptCount: 0,
          sessions: {
            push: {
              sessionId,
              isActive: true,
              createdAt: new Date(),
              expiresAt,
              lastSeenAt: new Date(),
            },
          },
          history: {
            push: {
              action: "LOGIN",
              description: "Admin login successful after OTP verification",
              createdAt: new Date(),
            },
          },
        },
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        redirectTo: "/admin",
        admin: sanitizeAdmin(admin),
      });

      response.cookies.set("admin_session_id", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("ADMIN_OTP_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}