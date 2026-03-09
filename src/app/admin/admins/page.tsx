"use client";

import React, { useState, useMemo } from "react";
import {
  UserPlus,
  Search,
  Filter,
  LogIn,
  Edit,
  Trash2,
  Eye,
  Shield,
  Download,
  Smartphone,
  X,
  ChevronRight,
  ChevronLeft,
  Camera,
  ShieldCheck,
  Info,
} from "lucide-react";
import Image from "next/image";

// --- TYPES ---
type AdminMember = {
  id: string;
  name: string;
  username: string;
  email: string;
  mobile: string;
  uid4: string;
  adminType: string;
  createdBy: string;
  createdAt: string;
  status: "ACTIVE" | "BLOCKED" | "INACTIVE";
  maxDevices: number;
  activeSessions: number;
  permissionCount: number;
  profileImageUrl?: string;
};

export default function AdminsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [modalType, setModalType] = useState<
    "CREATE" | "EDIT" | "VIEW" | "DELETE" | "LOGIN_AS" | null
  >(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminMember | null>(null);
  const [step, setStep] = useState(1);

  const [admins] = useState<AdminMember[]>([
    {
      id: "1",
      name: "Raj Patel",
      username: "rajpatel",
      email: "raj@apex.com",
      mobile: "9876543210",
      uid4: "ADM001",
      adminType: "ADMIN",
      createdBy: "SUPERADMIN",
      createdAt: "12 Feb 2026",
      status: "ACTIVE",
      maxDevices: 3,
      activeSessions: 2,
      permissionCount: 14,
      profileImageUrl: "/user.png",
    },
    {
      id: "2",
      name: "Arjun Mehta",
      username: "arjun_m",
      email: "arjun@apex.com",
      mobile: "9988776655",
      uid4: "ADM002",
      adminType: "TRAFFIC_PERSON",
      createdBy: "RAJ PATEL",
      createdAt: "01 Mar 2026",
      status: "ACTIVE",
      maxDevices: 1,
      activeSessions: 1,
      permissionCount: 8,
      profileImageUrl: "/user.png",
    },
    {
      id: "3",
      name: "Suman Rao",
      username: "suman_r",
      email: "suman@apex.com",
      mobile: "9000000001",
      uid4: "ADM003",
      adminType: "DATA_MANAGER",
      createdBy: "SUPERADMIN",
      createdAt: "05 Mar 2026",
      status: "BLOCKED",
      maxDevices: 2,
      activeSessions: 0,
      permissionCount: 12,
      profileImageUrl: "/user.png",
    },
  ]);

  const filteredData = useMemo(() => {
    return admins.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.uid4.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.username.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = filterRole === "ALL" || a.adminType === filterRole;
      return matchSearch && matchRole;
    });
  }, [searchQuery, filterRole, admins]);

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAdmin(null);
    setStep(1);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-white overflow-hidden p-px">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-px bg-white">
        <div className="flex flex-col md:flex-row items-center gap-2 flex-1 max-w-4xl">
          <h1 className="text-xl font-black text-[#1a5d68] shrink-0 mr-3">
            Admins
          </h1>

          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search admins..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-teal-100 focus:outline-none focus:border-[#268999] font-bold text-xs text-[#1a5d68]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative min-w-[160px] w-full md:w-auto">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <select
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-teal-100 font-black text-[10px] text-[#1a5d68] uppercase tracking-widest focus:outline-none appearance-none cursor-pointer"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="SUPERADMIN">Superadmin</option>
              <option value="ADMIN">Admin</option>
              <option value="TRAFFIC_PERSON">Traffic Person</option>
              <option value="DATA_MANAGER">Data Manager</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-teal-100 text-[#268999] font-black text-[10px] hover:bg-teal-50 transition-all uppercase tracking-widest bg-white">
            <Download size={14} /> Export
          </button>

          <button
            onClick={() => setModalType("CREATE")}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1a5d68] text-white font-black text-[10px] hover:bg-orange-500 transition-all uppercase tracking-widest"
          >
            <UserPlus size={14} /> Create
          </button>
        </div>
      </div>

      {/* TABLE AREA */}
      <div className="flex-1 overflow-auto bg-white p-px custom-scrollbar">
        <div className="bg-white rounded-[1.25rem] border border-teal-100 overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1100px] bg-white">
            <thead className="sticky top-0 z-20 bg-white">
              <tr className="border-b border-teal-100">
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest bg-white">
                  Profile
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest bg-white">
                  Role & UID
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest bg-white">
                  Created Info
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest text-center bg-white">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest text-center bg-white">
                  Devices
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest text-center bg-white">
                  Perms
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-[#1a5d68]/60 uppercase tracking-widest text-right bg-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-teal-50 bg-white">
              {filteredData.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-white transition-all group bg-white"
                >
                  <td className="px-6 py-4 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-100 shrink-0 relative bg-white">
                        <Image
                          src={admin.profileImageUrl || "/user.png"}
                          alt={admin.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-[13px] font-black text-[#1a5d68]">
                          {admin.name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-500 leading-none">
                          @{admin.username}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 bg-white">
                    <p className="text-[11px] font-black text-orange-600 uppercase">
                      ID: {admin.uid4}
                    </p>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-teal-100 text-[9px] font-black text-[#268999] w-fit mt-1">
                      <Shield size={10} />
                      {admin.adminType.replaceAll("_", " ")}
                    </div>
                  </td>

                  <td className="px-6 py-4 bg-white">
                    <p className="text-[11px] font-bold text-gray-600 leading-none">
                      By: {admin.createdBy}
                    </p>
                    <p className="text-[11px] font-black text-black mt-1">
                      {admin.createdAt}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-center bg-white">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                        admin.status === "ACTIVE"
                          ? "bg-green-50 text-green-600 border-green-100"
                          : admin.status === "BLOCKED"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200"
                      }`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${
                          admin.status === "ACTIVE"
                            ? "bg-green-500 animate-pulse"
                            : admin.status === "BLOCKED"
                            ? "bg-red-500"
                            : "bg-zinc-500"
                        }`}
                      />
                      {admin.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 bg-white">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-black text-[#1a5d68] flex items-center gap-1">
                        <Smartphone size={10} />
                        {admin.activeSessions} / {admin.maxDevices}
                      </span>

                      <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            admin.activeSessions >= admin.maxDevices
                              ? "bg-red-500"
                              : "bg-teal-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              (admin.activeSessions / admin.maxDevices) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center bg-white">
                    <span className="text-[11px] font-black text-[#1a5d68] bg-white border border-teal-100 px-2 py-1 rounded-lg">
                      {admin.permissionCount}
                    </span>
                  </td>

                  <td className="px-6 py-4 bg-white">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setModalType("LOGIN_AS");
                        }}
                        className="p-2 rounded-lg bg-white border border-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <LogIn size={14} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setModalType("VIEW");
                        }}
                        className="p-2 rounded-lg bg-white border border-teal-100 text-[#1a5d68] hover:bg-[#1a5d68] hover:text-white transition-all"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setModalType("EDIT");
                        }}
                        className="p-2 rounded-lg bg-white border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Edit size={14} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setModalType("DELETE");
                        }}
                        className="p-2 rounded-lg bg-white border border-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-sm font-bold text-gray-400 bg-white"
                  >
                    No admins found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-3 bg-white border-t border-teal-100 flex items-center justify-between shrink-0">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Showing {filteredData.length} of {admins.length} entries
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-teal-100 bg-white text-[10px] font-black text-[#1a5d68] hover:bg-teal-50 transition-all uppercase tracking-widest">
            Prev
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#1a5d68] text-white text-[10px] font-black">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-teal-100 bg-white text-[10px] font-black text-[#1a5d68] hover:bg-teal-50 transition-all uppercase tracking-widest">
            Next
          </button>
        </div>
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] shadow-2xl relative max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-7 border-b border-teal-100 bg-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-teal-100 flex items-center justify-center text-[#268999]">
                  {modalType === "CREATE" ? (
                    <UserPlus size={24} />
                  ) : modalType === "EDIT" ? (
                    <Edit size={24} />
                  ) : (
                    <ShieldCheck size={24} />
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a5d68] uppercase tracking-wider">
                    {modalType} ADMIN
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {modalType === "CREATE"
                      ? "New System Profile"
                      : selectedAdmin?.name}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-white border border-zinc-200 hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-all flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
              {modalType === "DELETE" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Trash2 size={40} />
                  </div>

                  <h3 className="text-2xl font-black text-[#1a5d68] mb-2">
                    Are you sure?
                  </h3>

                  <p className="text-sm font-bold text-gray-400 mb-8 px-10">
                    You are about to delete{" "}
                    <span className="text-red-500">{selectedAdmin?.name}</span>.
                    This action is irreversible.
                  </p>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Reason for deletion..."
                      className="w-full p-4 rounded-2xl border border-red-100 focus:outline-none text-sm font-bold"
                    />

                    <button className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-[0.2em]">
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}

              {modalType === "LOGIN_AS" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <LogIn size={40} />
                  </div>

                  <h3 className="text-2xl font-black text-[#1a5d68] mb-2">
                    Switch Account?
                  </h3>

                  <p className="text-sm font-bold text-gray-400 mb-8 px-10">
                    You will be logged in as{" "}
                    <span className="text-[#268999]">{selectedAdmin?.name}</span>.
                    Your current session will be paused.
                  </p>

                  <button className="w-full py-4 bg-[#1a5d68] text-white rounded-2xl font-black uppercase tracking-[0.2em]">
                    Login as {selectedAdmin?.name}
                  </button>
                </div>
              )}

              {(modalType === "CREATE" ||
                modalType === "EDIT" ||
                modalType === "VIEW") && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between px-10 relative">
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-teal-100 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black z-10 transition-all ${
                          step >= s
                            ? "bg-[#1a5d68] border-[#1a5d68] text-white"
                            : "bg-white border-teal-100 text-teal-200"
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                      <div className="flex justify-center mb-8">
                        <div className="relative group cursor-pointer">
                          <div className="w-24 h-24 rounded-3xl bg-white border-2 border-dashed border-teal-200 flex items-center justify-center text-teal-400 group-hover:bg-teal-50 transition-all overflow-hidden relative">
                            {modalType === "CREATE" ? (
                              <Camera size={32} />
                            ) : (
                              <Image
                                src={selectedAdmin?.profileImageUrl || "/user.png"}
                                alt=""
                                fill
                                className="rounded-3xl object-cover"
                              />
                            )}
                          </div>

                          <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-1.5 rounded-lg shadow-lg">
                            <UserPlus size={14} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <InputGroup
                          label="Full Name"
                          placeholder="e.g. Raj Patel"
                          defaultValue={selectedAdmin?.name}
                        />
                        <InputGroup
                          label="Username"
                          placeholder="e.g. rajpatel"
                          defaultValue={selectedAdmin?.username}
                        />
                        <InputGroup
                          label="Email Address"
                          placeholder="raj@example.com"
                          defaultValue={selectedAdmin?.email}
                        />
                        <InputGroup
                          label="Mobile Number"
                          placeholder="+91"
                          defaultValue={selectedAdmin?.mobile}
                        />
                        <SelectGroup
                          label="Admin Type"
                          options={[
                            "SUPERADMIN",
                            "ADMIN",
                            "TRAFFIC_PERSON",
                            "DATA_MANAGER",
                          ]}
                          defaultValue={selectedAdmin?.adminType}
                        />
                        <InputGroup
                          label="Designation"
                          placeholder="e.g. Senior Manager"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                      <div className="p-4 bg-white rounded-2xl border border-teal-100 flex items-start gap-4">
                        <Info
                          className="text-[#268999] shrink-0 mt-0.5"
                          size={20}
                        />
                        <p className="text-[11px] font-bold text-[#1a5d68] leading-relaxed">
                          Select specialized permissions for this admin. Note:
                          Only Superadmin can grant ADMIN_CREATE access.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "USER_VIEW",
                          "USER_CREATE",
                          "USER_EDIT",
                          "PAYMENT_VIEW",
                          "INDENT_MANAGE",
                          "NOTIFICATION_SEND",
                          "SUPPORT_ACCESS",
                        ].map((p) => (
                          <div
                            key={p}
                            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-teal-100"
                          >
                            <span className="text-[11px] font-black text-[#1a5d68]">
                              {p}
                            </span>
                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-[#1a5d68]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                      <div className="space-y-4">
                        <div className="p-6 bg-white rounded-[2rem] border border-orange-100">
                          <h4 className="text-sm font-black text-orange-600 mb-4 flex items-center gap-2">
                            <Smartphone size={18} />
                            Device Limitation
                          </h4>

                          <div className="flex items-center gap-4">
                            {[1, 2, 3, 5, "Unlimited"].map((v) => (
                              <button
                                key={v.toString()}
                                className="flex-1 py-3 rounded-xl bg-white border border-orange-100 font-black text-xs text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <InputGroup
                            label="Initial Password"
                            placeholder="••••••••"
                          />
                          <InputGroup
                            label="System T-PIN"
                            placeholder="6 Digits"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {(modalType === "CREATE" ||
              modalType === "EDIT" ||
              modalType === "VIEW") && (
              <div className="p-7 border-t border-teal-100 bg-white shrink-0 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-teal-100 text-[#268999] font-black text-[11px] hover:bg-teal-50 uppercase tracking-widest"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#1a5d68] text-white font-black text-[11px] hover:bg-orange-500 transition-all uppercase tracking-widest"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-4 rounded-2xl bg-orange-500 text-white font-black text-[11px] hover:bg-[#1a5d68] transition-all uppercase tracking-widest"
                  >
                    Save & Sync Profile
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

function InputGroup({
  label,
  placeholder,
  defaultValue = "",
}: {
  label: string;
  placeholder: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-black text-[#1a5d68]/40 uppercase tracking-widest ml-1">
        {label}
      </p>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full p-3.5 rounded-xl border border-teal-100 bg-white focus:outline-none focus:border-[#268999] text-sm font-bold text-[#1a5d68]"
      />
    </div>
  );
}

function SelectGroup({
  label,
  options,
  defaultValue = "",
}: {
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-black text-[#1a5d68]/40 uppercase tracking-widest ml-1">
        {label}
      </p>
      <select
        defaultValue={defaultValue}
        className="w-full p-3.5 rounded-xl border border-teal-100 bg-white focus:outline-none focus:border-[#268999] text-[11px] font-black text-[#1a5d68] uppercase"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}