import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { prisma } from "@/lib/db/prisma";
import { getCurrentAdminFromRequest } from "@/lib/auth/getCurrentAdmin";

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

    const formData = await request.formData();
    const file = formData.get("profileImage");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Profile image is required." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only JPG, JPEG and PNG files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "Maximum file size is 10MB." },
        { status: 400 }
      );
    }

    const adminTypeFolder = String(currentAdmin.adminType || "admin").toLowerCase();
    const mobileFolder = String(currentAdmin.mobileNumber || "unknown");

    const relativeDir = path.join("admin", adminTypeFolder, mobileFolder);
    const absoluteDir = path.join(process.cwd(), "public", relativeDir);

    await fs.mkdir(absoluteDir, { recursive: true });

    const fileExtension = file.type === "image/png" ? "png" : "jpg";
    const fileName = `user_profile.${fileExtension}`;
    const absoluteFilePath = path.join(absoluteDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const existingFiles = ["user_profile.jpg", "user_profile.jpeg", "user_profile.png"];
    await Promise.all(
      existingFiles.map(async (oldFile) => {
        try {
          await fs.unlink(path.join(absoluteDir, oldFile));
        } catch {
          // ignore if not exists
        }
      })
    );

    await fs.writeFile(absoluteFilePath, buffer);

    const profileImageUrl = `/${relativeDir.replace(/\\/g, "/")}/${fileName}?v=${Date.now()}`;

    await prisma.admin.update({
      where: { id: currentAdmin.id },
      data: {
        profileImageUrl,
        history: {
          push: {
            action: "PROFILE_IMAGE_UPDATED",
            description: "Admin profile image updated",
            createdAt: new Date(),
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile image uploaded successfully.",
      profileImageUrl,
    });
  } catch (error) {
    console.error("ADMIN_PROFILE_UPLOAD_PHOTO_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong while uploading profile image." },
      { status: 500 }
    );
  }
}