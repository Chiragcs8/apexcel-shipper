import { NextResponse } from "next/server";
import { getCurrentAdminFromRequest } from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";

export async function GET(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin } = auth;

    if (!hasPermission(currentAdmin.permissions, "refer_earn.view:yes")) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    const referCount = currentAdmin.referCount || 0;
    const rewardPoints = referCount * 10;

    return NextResponse.json({
      success: true,
      data: {
        referralCode: currentAdmin.uid4,
        inviteUrl: currentAdmin.inviteUrl || "",
        totalJoins: referCount,
        totalPoints: rewardPoints,
        canDownload: hasPermission(
          currentAdmin.permissions,
          "refer_earn.download:yes"
        ),
      },
    });
  } catch (error) {
    console.error("ADMIN_REFER_FETCH_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}