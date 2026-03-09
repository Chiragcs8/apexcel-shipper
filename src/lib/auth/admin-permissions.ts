type SafeAdminInput = {
  id: string;
  username: string;
  name: string;
  designation: string;
  adminType: string;
  permissions: string[];
  mobileNumber: string;
  email: string;
  profileImageUrl?: string | null;
  uid1?: string;
  uid2?: string;
  uid3?: string;
  uid4?: string;
  status?: string;
  inviteUrl?: string | null;
  branchCount?: number;
  createdAt?: Date;
};

export function sanitizeAdmin(admin: SafeAdminInput) {
  return {
    id: admin.id,
    username: admin.username,
    name: admin.name,
    designation: admin.designation,
    adminType: admin.adminType,
    status: admin.status,
    permissions: admin.permissions || [],
    mobileNumber: admin.mobileNumber,
    email: admin.email,
    profileImageUrl: admin.profileImageUrl || null,
    uid1: admin.uid1,
    uid2: admin.uid2,
    uid3: admin.uid3,
    uid4: admin.uid4,
    inviteUrl: admin.inviteUrl || null,
    branchCount: admin.branchCount || 0,
    createdAt: admin.createdAt,
  };
}