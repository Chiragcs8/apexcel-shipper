"use client";

import { useState } from "react";
import { X, Trash2, ShieldAlert, Loader2, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [tpin, setTpin] = useState("");
  const [reason, setReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setErrorMessage("");

      if (!tpin.trim() || tpin.trim().length < 4) {
        setErrorMessage("Please enter a valid TPIN.");
        return;
      }

      setIsDeleting(true);

      const res = await fetch("/api/admin/auth/delete-account", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tpin: tpin.trim(),
          reason: reason.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        setErrorMessage(data?.message || "Unable to delete account.");
        return;
      }

      router.replace(data?.redirectTo || "/");
      router.refresh();
    } catch (error) {
      setErrorMessage("Something went wrong while deleting account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-red-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1a5d68]">Delete Account</h2>
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Soft Delete Confirmation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 flex items-center justify-center transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 bg-[#fffdfd]">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert size={22} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-black text-red-600 uppercase tracking-wider">
                  Important
                </h3>
                <p className="text-sm font-bold text-zinc-700 mt-2 leading-relaxed">
                  Your account will not be permanently removed from database.
                  It will be marked as deleted, all sessions will be closed,
                  and you will be logged out immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-[#1a5d68] uppercase tracking-wider mb-2 block">
                Enter TPIN
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="password"
                  value={tpin}
                  onChange={(e) => setTpin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter TPIN"
                  className="w-full h-13 pl-11 pr-4 rounded-2xl border border-zinc-200 outline-none focus:border-red-400 font-bold tracking-[0.25em]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#1a5d68] uppercase tracking-wider mb-2 block">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write reason for deleting this account"
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 outline-none focus:border-red-400 p-4 font-semibold resize-none"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-sm font-bold text-red-600">{errorMessage}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-6 md:px-8 py-5 border-t border-red-50 bg-white flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-5 rounded-2xl border border-zinc-200 text-zinc-700 font-black hover:bg-zinc-50 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-12 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black transition-all disabled:opacity-50 inline-flex items-center gap-2"
          >
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}