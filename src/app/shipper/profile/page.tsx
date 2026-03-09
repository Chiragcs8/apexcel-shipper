"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  ShieldCheck,
  Landmark,
  FileText,
  Camera,
  Loader2,
  QrCode,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  MapIcon,
} from "lucide-react";
import Image from "next/image";
import UpdatePasswordModal from "@/components/admin/UpdatePasswordModal";
import UpdateTpinModal from "@/components/admin/UpdateTpinModal";

type AdminProfile = {
  name: string;
  username: string;
  designation: string;
  adminType: string;
  email: string;
  mobileNumber: string;
  profileImageUrl?: string | null;
  uid2: string;
  uid4: string;
  companyName?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  holderName?: string;
  upiId?: string;
  status: string;
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [showNumbers, setShowNumbers] = useState({
    aadhaar: false,
    pan: false,
    bank: false,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTpinModal, setShowTpinModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        setProfile(data.admin);
      }
    } catch (error) {
      console.error("ADMIN_PROFILE_FETCH_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const toggleShow = (key: keyof typeof showNumbers) => {
    setShowNumbers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePhotoButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG and PNG files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert("Maximum file size is 10MB.");
      event.target.value = "";
      return;
    }

    try {
      setIsUploadingPhoto(true);

      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await fetch("/api/admin/profile/upload-photo", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        alert(data?.message || "Unable to upload profile image.");
        return;
      }

      await fetchProfile();
      alert(data?.message || "Profile image updated successfully.");
    } catch (error) {
      console.error("PROFILE_PHOTO_UPLOAD_ERROR", error);
      alert("Something went wrong while uploading image.");
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#268999]" size={32} />
      </div>
    );
  }

  return (
    <>
      <div className="px-1 py-1 md:px-1 md:py-1 space-y-1 animate-in fade-in duration-500 overflow-hidden">
        <div>
          <h1 className="text-2xl font-black text-[#1a5d68]">Profile</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">
            Secure Panel • {profile?.name || "---"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 space-y-6 flex flex-col">
            <div className="bg-white rounded-[2rem] p-5 border border-teal-50 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="relative w-20 h-20 rounded-3xl overflow-hidden border-4 border-[#F0F7F8]">
                  <Image
                    src={profile?.profileImageUrl || "/user.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePhotoButtonClick}
                  disabled={isUploadingPhoto}
                  className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1.5 rounded-xl shadow-md hover:scale-110 transition-transform disabled:opacity-60"
                  title="Upload profile image"
                >
                  {isUploadingPhoto ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Camera size={14} />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,image/png,image/jpeg"
                  className="hidden"
                  onChange={handleProfilePhotoChange}
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black text-[#1a5d68]">
                    {profile?.name || "---"}
                  </h2>

                  <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-0.5 rounded-full border border-green-100 text-[9px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {profile?.status || "---"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] font-bold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={13} className="text-[#268999]/70" />
                    {profile?.designation || "---"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapIcon size={13} className="text-[#268999]/70" />
                    Ahmedabad HO
                  </span>

                  <span className="flex items-center gap-1.5 text-orange-500 uppercase tracking-tighter font-black">
                    <ShieldCheck size={13} />
                    EMP: {profile?.uid2 || "---"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-teal-50 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 border-b border-teal-50 pb-3">
                <User size={14} className="text-[#268999]" />
                Personal & Contact Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<User />} label="Username" value={profile?.username} />
                <InfoItem icon={<Mail />} label="Email Address" value={profile?.email} />
                <InfoItem icon={<Phone />} label="Mobile Number" value={profile?.mobileNumber} />
                <InfoItem
                  icon={<MapPin />}
                  label="Current Location"
                  value={
                    profile?.city || profile?.state
                      ? `${profile?.city || ""}${profile?.city && profile?.state ? ", " : ""}${profile?.state || ""}`
                      : "---"
                  }
                />
                <div className="md:col-span-2">
                  <InfoItem
                    icon={<FileText />}
                    label="Registered Office Address"
                    value={profile?.addressLine1}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-teal-50 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 border-b border-teal-50 pb-3">
                <Lock size={14} className="text-[#268999]" />
                Security & Access
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F0F7F8]/40 p-4 rounded-2xl border border-teal-50 flex items-center justify-between group hover:border-teal-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#268999] shadow-sm">
                      <Lock size={18} />
                    </div>
                    <h4 className="text-[13px] font-black text-[#1a5d68]">
                      Account Password
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="text-[9px] font-black bg-[#1a5d68] text-white px-3 py-1.5 rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    UPDATE
                  </button>
                </div>

                <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-100 flex items-center justify-between group hover:border-orange-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                      <KeyRound size={18} />
                    </div>
                    <h4 className="text-[13px] font-black text-[#1a5d68]">
                      Security T-PIN
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTpinModal(true)}
                    className="text-[9px] font-black bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-[#1a5d68] transition-colors"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-teal-50 shadow-sm flex-1">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 border-b border-teal-50 pb-3">
                <ShieldCheck size={14} className="text-orange-500" />
                Identity Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SecureField
                  label="Aadhaar Number"
                  value={profile?.aadhaarNumber}
                  isVisible={showNumbers.aadhaar}
                  onToggle={() => toggleShow("aadhaar")}
                />

                <SecureField
                  label="PAN Card Number"
                  value={profile?.panNumber}
                  isVisible={showNumbers.pan}
                  onToggle={() => toggleShow("pan")}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F0F7F8] rounded-[2.5rem] p-7 border border-teal-50 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-6">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2 border-b border-[#1a5d68]/10 pb-3">
                <Landmark size={14} className="text-[#1a5d68]" />
                Settlement Info
              </h3>

              <div className="space-y-5">
                <BankItem label="Account Holder" value={profile?.holderName} />
                <BankItem label="Bank Name" value={profile?.bankName} />
                <SecureField
                  label="Account Number"
                  value={profile?.accountNumber}
                  isVisible={showNumbers.bank}
                  onToggle={() => toggleShow("bank")}
                  lightMode
                />
                <BankItem label="IFSC Code" value={profile?.ifscCode} highlight />

                <div className="pt-4">
                  <div className="bg-orange-500 p-5 rounded-[2rem] shadow-xl border border-orange-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[9px] font-black text-orange-100 uppercase tracking-[0.2em]">
                        Primary UPI ID
                      </p>
                      <QrCode size={18} className="text-orange-200" />
                    </div>

                    <p className="text-md font-black text-white italic truncate">
                      {profile?.upiId || "not.set@upi"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <p className="text-[10px] font-bold text-[#1a5d68]/60 leading-relaxed bg-white p-4 rounded-2xl border border-teal-100 text-center">
                Verification required for updates. Contact system support for modifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      <UpdatePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <UpdateTpinModal
        isOpen={showTpinModal}
        onClose={() => setShowTpinModal(false)}
      />
    </>
  );
}

function SecureField({
  label,
  value,
  isVisible,
  onToggle,
  lightMode = false,
}: {
  label: string;
  value?: string;
  isVisible: boolean;
  onToggle: () => void;
  lightMode?: boolean;
}) {
  const maskedValue = value ? `●●●● ●●●● ${value.slice(-4)}` : "Not Updated";
  const bgClass = lightMode
    ? "bg-white border-teal-50"
    : "bg-[#F0F7F8]/40 border-teal-50";

  return (
    <div className={`p-3.5 rounded-xl border ${bgClass}`}>
      <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-gray-400">
        {label}
      </p>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-black text-[#1a5d68] tracking-widest font-mono">
          {isVisible ? value || "Not Updated" : maskedValue}
        </p>

        <button
          type="button"
          onClick={onToggle}
          className="text-[#268999] hover:opacity-70 transition-opacity"
        >
          {isVisible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-[#F0F7F8] text-[#268999] flex items-center justify-center shrink-0 border border-teal-50 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
        {React.cloneElement(icon as React.ReactElement, { size: 16 })}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-[13px] font-black text-[#1a5d68] truncate">
          {value || "---"}
        </p>
      </div>
    </div>
  );
}

function BankItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
}) {
  return (
    <div className="border-b border-[#1a5d68]/5 pb-3 last:border-0">
      <p className="text-[8px] font-black text-[#1a5d68]/40 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={`text-[13px] font-bold ${
          highlight ? "text-orange-600" : "text-[#1a5d68]"
        } truncate`}
      >
        {value || "---"}
      </p>
    </div>
  );
}