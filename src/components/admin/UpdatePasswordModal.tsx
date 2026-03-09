"use client";

import { useState } from "react";
import { X, Loader2, Lock, Eye, EyeOff } from "lucide-react";

// FIX: Component ko modal ke bahar define kiya gaya hai taaki focus lose na ho
const PasswordInput = ({
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}) => (
  <div className="relative">
    <input
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 px-4 pr-12 rounded-xl border border-zinc-200 outline-none focus:border-[#268999] font-bold text-sm text-[#1a5d68]"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-[#268999] transition-colors"
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

export default function UpdatePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showFields, setShowFields] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowFields({
      current: false,
      next: false,
      confirm: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/admin/profile/update-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        alert(data?.message || "Unable to update password.");
        return;
      }

      alert(data.message || "Password updated successfully.");
      handleClose();
    } catch (error) {
      alert("Something went wrong while updating password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Smooth Backdrop Blur */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-teal-50 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-teal-50 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#268999] shadow-inner">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1a5d68]">Update Password</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Secure Account Access
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-600 flex items-center justify-center transition-all group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-5 bg-[#F8FAFB]/50">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#268999] uppercase tracking-widest ml-1">Current Security</p>
              <PasswordInput
                placeholder="Enter current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={showFields.current}
                onToggle={() => setShowFields(p => ({ ...p, current: !p.current }))}
              />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#268999] uppercase tracking-widest ml-1">New Password</p>
              <PasswordInput
                placeholder="Create new password"
                value={newPassword}
                onChange={setNewPassword}
                visible={showFields.next}
                onToggle={() => setShowFields(p => ({ ...p, next: !p.next }))}
              />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#268999] uppercase tracking-widest ml-1">Confirm New Password</p>
              <PasswordInput
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showFields.confirm}
                onToggle={() => setShowFields(p => ({ ...p, confirm: !p.confirm }))}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 mt-2 rounded-[1.5rem] bg-[#268999] text-white font-black hover:bg-[#1a5d68] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-teal-500/20"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
            <span className="uppercase tracking-widest text-sm">
              {isSubmitting ? "Updating..." : "Update Password"}
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-4 bg-white border-t border-teal-50 text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Logout from all other devices after update
          </p>
        </div>
      </div>
    </div>
  );
}