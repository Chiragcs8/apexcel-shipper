"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  CreditCard,
  Star,
  Languages,
  Info,
  LogOut,
  Trash2,
  CalendarClock,
} from "lucide-react";
import LogoutDevicesModal from "@/components/admin/LogoutDevicesModal";
import DeleteAccountModal from "@/components/admin/DeleteAccountModal";

type CurrentAdmin = {
  id: string;
  name: string;
  designation: string;
  adminType: string;
  mobileNumber: string;
  email: string;
  profileImageUrl?: string | null;
  permissions?: string[];
};

export default function AdminHeader({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadCurrentAdmin = async () => {
      try {
        const res = await fetch("/api/admin/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (res.ok && data?.success) {
          setCurrentAdmin(data.admin);
        }
      } catch (error) {
        console.error("ADMIN_HEADER_ME_ERROR", error);
      }
    };

    loadCurrentAdmin();
  }, []);

  const formattedDate =
    currentTime?.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }) || "Loading date...";

  const formattedTime =
    currentTime?.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }) || "--:--:--";

  const displayImage = currentAdmin?.profileImageUrl || "/user.png";

  const canViewLogout = currentAdmin?.permissions?.includes("logout.view:yes");
  const canViewDelete = currentAdmin?.permissions?.includes("delete_account.view:yes");

  const openLogoutModal = () => {
    setIsProfileOpen(false);
    setShowLogoutModal(true);
  };

  const openDeleteModal = () => {
    setIsProfileOpen(false);
    setShowDeleteModal(true);
  };

  return (
    <>
      <header className="h-20 bg-white border-b border-teal-100 flex items-center justify-between px-4 lg:px-6 z-40 shrink-0 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-xl bg-[#F0F7F8] border border-teal-100 flex items-center justify-center text-[#1a5d68] hover:bg-orange-50 hover:border-orange-100 hover:text-orange-600 transition-all shadow-sm shrink-0"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-3 bg-[#F0F7F8]/50 px-4 py-2 rounded-xl border border-teal-50">
            <CalendarClock size={16} className="text-[#268999]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#268999]/70 uppercase tracking-widest leading-none mb-1">
                {formattedDate}
              </span>
              <span className="text-sm font-black text-[#1a5d68] leading-none">
                {formattedTime}{" "}
                <span className="text-[10px] text-orange-500 ml-1">IST</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5 justify-end">
          <div className="hidden md:flex items-center bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl max-w-xs xl:max-w-md overflow-hidden relative shadow-inner">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-3 shrink-0" />
            <p className="text-xs font-bold text-orange-700 truncate">
              Notifications will be connected next
            </p>
          </div>

          <Link
            href="/shipper/notifications"
            className="relative w-10 h-10 rounded-xl bg-[#F0F7F8] border border-teal-100 flex items-center justify-center text-[#1a5d68] hover:bg-teal-50 hover:text-[#268999] transition-colors shadow-sm shrink-0"
          >
            <Bell size={18} />
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white border border-teal-100 hover:bg-[#F0F7F8] transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-full bg-[#268999] flex items-center justify-center overflow-hidden text-white font-black text-sm border-2 border-white shadow-sm group-hover:bg-orange-500 transition-colors relative">
                <Image
                  src={displayImage}
                  alt={currentAdmin?.name || "Shipper"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-black text-[#1a5d68] leading-none">
                  {currentAdmin?.name || "Loading..."}
                </span>
                <span className="text-[9px] font-bold text-[#268999] uppercase tracking-widest mt-0.5">
                  {currentAdmin?.designation || "Shipper"}
                </span>
              </div>

              <ChevronDown
                size={14}
                className="text-[#268999]/50 hidden sm:block ml-1 group-hover:text-[#268999]"
              />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />

                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(38,137,153,0.15)] border border-teal-100 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="p-3 space-y-1">
                    <Link
                      href="/shipper/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-sm font-bold text-[#1a5d68] hover:text-orange-600 transition-colors group"
                    >
                      <User
                        size={18}
                        className="text-[#268999] group-hover:text-orange-500 transition-colors"
                      />
                      Profile
                    </Link>

                    <Link
                      href="/shipper/membership"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-sm font-bold text-[#1a5d68] hover:text-orange-600 transition-colors group"
                    >
                      <CreditCard
                        size={18}
                        className="text-[#268999] group-hover:text-orange-500 transition-colors"
                      />
                      Membership
                    </Link>

                    <Link
                      href="/shipper/refer"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-sm font-bold text-[#1a5d68] hover:text-orange-600 transition-colors group"
                    >
                      <Star
                        size={18}
                        className="text-[#268999] group-hover:text-orange-500 transition-colors"
                      />
                      Refer & Earn
                    </Link>

                    <Link
                      href="/shipper/language"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-sm font-bold text-[#1a5d68] hover:text-orange-600 transition-colors group"
                    >
                      <Languages
                        size={18}
                        className="text-[#268999] group-hover:text-orange-500 transition-colors"
                      />
                      Language
                    </Link>

                    <Link
                      href="/shipper/support"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 text-sm font-bold text-[#1a5d68] hover:text-orange-600 transition-colors group"
                    >
                      <Info
                        size={18}
                        className="text-[#268999] group-hover:text-orange-500 transition-colors"
                      />
                      Help & support
                    </Link>
                  </div>

                  <div className="p-3 border-t border-teal-50 grid grid-cols-2 gap-2">
                    {canViewLogout ? (
                      <button
                        type="button"
                        onClick={openLogoutModal}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 hover:bg-[#268999] hover:text-white text-xs font-black text-[#268999] transition-colors shadow-sm group"
                      >
                        <LogOut
                          size={14}
                          className="text-[#268999] group-hover:text-white"
                        />
                        Logout
                      </button>
                    ) : (
                      <div className="py-3 rounded-xl bg-zinc-100 text-center text-xs font-black text-zinc-400">
                        No Logout Access
                      </div>
                    )}

                    {canViewDelete ? (
                      <button
                        type="button"
                        onClick={openDeleteModal}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white border border-transparent hover:border-red-600 text-xs font-black text-red-600 transition-colors shadow-sm group"
                      >
                        <Trash2
                          size={14}
                          className="text-red-600 group-hover:text-white"
                        />
                        Delete
                      </button>
                    ) : (
                      <div className="py-3 rounded-xl bg-zinc-100 text-center text-xs font-black text-zinc-400">
                        No Delete Access
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <LogoutDevicesModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}