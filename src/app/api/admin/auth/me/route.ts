import { NextResponse } from "next/server";
import { getCurrentAdminFromRequest } from "@/lib/auth/getCurrentAdmin";
import { sanitizeAdmin } from "@/lib/auth/admin-permissions";

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

    return NextResponse.json({
      success: true,
      admin: sanitizeAdmin({
        id: currentAdmin.id,
        username: currentAdmin.username,
        name: currentAdmin.name,
        designation: currentAdmin.designation,
        adminType: currentAdmin.adminType,
        status: currentAdmin.status,
        permissions: currentAdmin.permissions || [],
        mobileNumber: currentAdmin.mobileNumber,
        email: currentAdmin.email,
        profileImageUrl: currentAdmin.profileImageUrl || null,
        uid1: currentAdmin.uid1,
        uid2: currentAdmin.uid2,
        uid3: currentAdmin.uid3,
        uid4: currentAdmin.uid4,
        inviteUrl: currentAdmin.inviteUrl || null,
        branchCount: currentAdmin.branchCount || 0,
        createdAt: currentAdmin.createdAt,
      }),
    });
  } catch (error) {
    console.error("ADMIN_ME_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}