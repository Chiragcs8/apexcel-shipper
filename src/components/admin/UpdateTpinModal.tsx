"use client";

import { useState } from "react";
import { X, Loader2, KeyRound, Eye, EyeOff } from "lucide-react";

// FIX: Component ko modal ke bahar define kiya gaya hai taaki focus lose na ho
const InputWithEye = ({
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
  numeric = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  numeric?: boolean;
}) => (
  <div className="relative">
    <input
      type={visible ? "text" : "password"}
      inputMode={numeric ? "numeric" : undefined}
      maxLength={numeric ? 6 : undefined}
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(numeric ? e.target.value.replace(/\D/g, "").slice(0, 6) : e.target.value)
      }
      className="w-full h-12 px-4 pr-12 rounded-xl border border-zinc-200 outline-none focus:border-[#268999] font-bold text-sm text-[#1a5d68]"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors"
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

export default function UpdateTpinModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newTpin, setNewTpin] = useState("");
  const [confirmTpin, setConfirmTpin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showFields, setShowFields] = useState({
    password: false,
    newTpin: false,
    confirmTpin: false,
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentPassword("");
    setNewTpin("");
    setConfirmTpin("");
    setShowFields({
      password: false,
      newTpin: false,
      confirmTpin: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (newTpin !== confirmTpin) {
      alert("New TPIN and Confirm TPIN do not match.");
      return;
    }
    if (newTpin.length !== 6) {
      alert("TPIN must be exactly 6 digits.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/admin/profile/update-tpin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newTpin, confirmTpin }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        alert(data?.message || "Unable to update TPIN.");
        return;
      }

      alert(data.message || "TPIN updated successfully.");
      handleClose();
    } catch (error) {
      alert("Something went wrong while updating TPIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-teal-50 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-teal-50 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-inner">
              <KeyRound size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1a5d68]">Reset T-PIN</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Secure 6-Digit Code
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 flex items-center justify-center transition-all group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-5 bg-[#F8FAFB]/50">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#268999] uppercase tracking-widest ml-1">Authentication</p>
              <InputWithEye
                placeholder="Enter current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={showFields.password}
                onToggle={() =>
                  setShowFields((prev) => ({ ...prev, password: !prev.password }))
                }
              />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">New Security Code</p>
              <InputWithEye
                placeholder="Create new 6-digit TPIN"
                value={newTpin}
                onChange={setNewTpin}
                visible={showFields.newTpin}
                onToggle={() =>
                  setShowFields((prev) => ({ ...prev, newTpin: !prev.newTpin }))
                }
                numeric
              />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Confirm Code</p>
              <InputWithEye
                placeholder="Confirm your new TPIN"
                value={confirmTpin}
                onChange={setConfirmTpin}
                visible={showFields.confirmTpin}
                onToggle={() =>
                  setShowFields((prev) => ({ ...prev, confirmTpin: !prev.confirmTpin }))
                }
                numeric
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 mt-2 rounded-[1.5rem] bg-orange-500 text-white font-black hover:bg-[#1a5d68] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
            <span className="uppercase tracking-widest text-sm">
              {isSubmitting ? "Updating..." : "Update Security PIN"}
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-4 bg-white border-t border-teal-50 text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            This PIN is required for sensitive transactions
          </p>
        </div>
      </div>
    </div>
  );
}