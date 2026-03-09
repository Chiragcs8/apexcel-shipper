import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Aapke naye format ke hisaab se permissions list
const ALL_PERMISSIONS = [
  "dashboard.view:yes", "dashboard.create:yes", "dashboard.edit:yes", "dashboard.download:yes", "dashboard.delete:yes",
  "notification.view:yes", "notification.create:yes", "notification.edit:yes", "notification.download:yes", "notification.delete:yes",
  "edit_profile.view:yes", "edit_profile.create:yes", "edit_profile.edit:yes", "edit_profile.download:yes", "edit_profile.delete:yes",
  "membership.view:yes", "membership.create:yes", "membership.edit:yes", "membership.download:yes", "membership.delete:yes",
  "refer_earn.view:yes", "refer_earn.create:yes", "refer_earn.edit:yes", "refer_earn.download:yes", "refer_earn.delete:yes",
  "language.view:yes", "language.create:yes", "language.edit:yes", "language.download:yes", "language.delete:yes",
  "logout.view:yes", "logout.create:yes", "logout.edit:yes", "logout.download:yes", "logout.delete:yes",
  "delete_account.view:yes", "delete_account.create:yes", "delete_account.edit:yes", "delete_account.download:yes", "delete_account.delete:yes",
  "help_support.view:yes", "help_support.create:yes", "help_support.edit:yes", "help_support.download:yes", "help_support.delete:yes",
  "chat.view:yes", "chat.create:yes", "chat.edit:yes", "chat.download:yes", "chat.delete:yes",
  "admin.view:yes", "admin.create:yes", "admin.edit:yes", "admin.download:yes", "admin.delete:yes",
  "indent.view:yes", "indent.create:yes", "indent.edit:yes", "indent.download:yes", "indent.delete:yes",
  "trucker.view:yes", "trucker.create:yes", "trucker.edit:yes", "trucker.download:yes", "trucker.delete:yes",
  "shipper.view:yes", "shipper.create:yes", "shipper.edit:yes", "shipper.download:yes", "shipper.delete:yes",
  "users.view:yes", "users.create:yes", "users.edit:yes", "users.download:yes", "users.delete:yes",
  "admins.view:yes", "admins.create:yes", "admins.edit:yes", "admins.download:yes", "admins.delete:yes",
  "truck_rate.view:yes", "truck_rate.create:yes", "truck_rate.edit:yes", "truck_rate.download:yes", "truck_rate.delete:yes",
  "finance.view:yes", "finance.create:yes", "finance.edit:yes", "finance.download:yes", "finance.delete:yes",
  "reports.view:yes", "reports.create:yes", "reports.edit:yes", "reports.download:yes", "reports.delete:yes",
  "website.view:yes", "website.create:yes", "website.edit:yes", "website.download:yes", "website.delete:yes"
];

const adminUsers = [
  {
    username: "superadmin",
    name: "Shri Narayan",
    designation: "superadmin",
    adminType: "SUPERADMIN",
    mobileNumber: "9000000001",
    email: "superadmin@apexcelmove.com",
    password: "123456",
    tpin: "111111",
    uid1: "9000000001",
    uid2: "EMP0001",
    uid3: "ADMIN",
    uid4: "SAPX0001",
    permissions: ALL_PERMISSIONS, // Isko puri 100+ permissions milengi
    inviteUrl: "https://apexcelmove.com/register?ref=SU0001",
  }
];

async function main() {
  console.log("🌱 Seeding started...");
  
  for (const admin of adminUsers) {
    const passwordHash = await bcrypt.hash(admin.password, 10);
    const tpinHash = await bcrypt.hash(admin.tpin, 10);

    await prisma.admin.upsert({
      where: { username: admin.username },
      update: {
        name: admin.name,
        designation: admin.designation,
        adminType: admin.adminType,
        mobileNumber: admin.mobileNumber,
        email: admin.email,
        passwordHash,
        tpinHash,
        uid1: admin.uid1,
        uid2: admin.uid2,
        uid3: admin.uid3,
        uid4: admin.uid4,
        permissions: admin.permissions,
        inviteUrl: admin.inviteUrl,
        status: "ACTIVE",
        history: {
          push: {
            action: "SEED_UPDATED",
            description: "Superadmin permissions updated with dot-yes format",
            createdAt: new Date(),
          }
        },
      },
      create: {
        username: admin.username,
        name: admin.name,
        designation: admin.designation,
        adminType: admin.adminType,
        mobileNumber: admin.mobileNumber,
        email: admin.email,
        passwordHash,
        tpinHash,
        uid1: admin.uid1,
        uid2: admin.uid2,
        uid3: admin.uid3,
        uid4: admin.uid4,
        status: "ACTIVE",
        companyName: "Apexcel Move Private Limited",
        permissions: admin.permissions,
        inviteUrl: admin.inviteUrl,
        referCount: 0,
        branchCount: 1,
        branches: [
          {
            branchName: "Ahmedabad HO",
            branchCode: "AHM-HO",
            city: "Ahmedabad",
            state: "Gujarat",
            address: "4th Floor, BIJAL BUSINESSES CENTRE, C-425, Aslali, Ahmedabad, 382427",
            mobile: admin.mobileNumber,
            createdAt: new Date(),
          },
        ],
        history: [
          {
            action: "SEED_CREATED",
            description: "Initial Superadmin seed created",
            createdAt: new Date(),
          },
        ],
        createdBy: "system",
      },
    });
  }

  console.log("✅ Admin seed completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });