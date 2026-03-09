"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  Check,
  Download,
  Users,
  Gift,
  Link2,
  ShieldAlert,
  Loader2,
} from "lucide-react";

type CurrentAdmin = {
  id: string;
  username: string;
  name: string;
  designation: string;
  adminType: string;
  permissions: string[];
};

type ReferSummary = {
  referralCode: string;
  inviteUrl: string;
  totalJoins: number;
  totalPoints: number;
  canDownload: boolean;
};

type ReferJoinRow = {
  name: string;
  companyName: string;
  joiningDate: string;
  status: string;
};

export default function ReferEarnPage() {
  const [admin, setAdmin] = useState<CurrentAdmin | null>(null);
  const [summary, setSummary] = useState<ReferSummary | null>(null);
  const [rows, setRows] = useState<ReferJoinRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopyDone, setIsCopyDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const meRes = await fetch("/api/admin/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const meData = await meRes.json();

        if (!meRes.ok || !meData?.success || !meData?.admin) {
          setErrorMessage(meData?.message || "Unable to load admin details.");
          return;
        }

        const currentAdmin = meData.admin as CurrentAdmin;
        setAdmin(currentAdmin);

        const canViewRefer =
          currentAdmin.permissions?.includes("refer_earn.view:yes") || false;

        if (!canViewRefer) {
          setErrorMessage("You do not have refer_earn.view:yes permission.");
          return;
        }

        const [summaryRes, rowsRes] = await Promise.all([
          fetch("/api/admin/refer/fetch", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
          fetch("/api/admin/refer/data", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
        ]);

        const summaryData = await summaryRes.json();
        const rowsData = await rowsRes.json();

        if (!summaryRes.ok || !summaryData?.success) {
          setErrorMessage(summaryData?.message || "Unable to load referral summary.");
          return;
        }

        setSummary(summaryData.data);

        if (!rowsRes.ok || !rowsData?.success) {
          setErrorMessage(rowsData?.message || "Unable to load referral report.");
          return;
        }

        setRows(rowsData.rows || []);
      } catch (error) {
        console.error("REFER_EARN_PAGE_ERROR", error);
        setErrorMessage("Something went wrong while loading refer data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, []);

  const handleCopy = async () => {
    if (!summary?.inviteUrl) return;

    try {
      await navigator.clipboard.writeText(summary.inviteUrl);
      setIsCopyDone(true);

      setTimeout(() => {
        setIsCopyDone(false);
      }, 2000);
    } catch (error) {
      alert("Unable to copy link");
    }
  };

  const handleDownload = async () => {
    if (!admin?.permissions?.includes("refer_earn.download:yes")) {
      alert("You do not have refer_earn.download:yes permission.");
      return;
    }

    try {
      const res = await fetch("/api/admin/refer/data?download=true", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data?.message || "Download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "refer-earn-report.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Something went wrong while downloading report");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-[#F0F7F8]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#268999]" size={40} />
          <p className="text-sm font-black text-[#1a5d68] animate-pulse uppercase tracking-widest">
            Loading Refer Data...
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-red-100 p-8 shadow-sm max-w-xl w-full">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-red-600">Access Issue</h2>
              <p className="text-sm font-bold text-zinc-600 mt-2">{errorMessage}</p>
              <p className="text-xs text-zinc-400 font-semibold mt-3">
                Please logout and login again if your permissions were updated recently.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const canDownloadReport =
    Boolean(summary?.canDownload) ||
    Boolean(admin?.permissions?.includes("refer_earn.download:yes"));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a5d68]">Refer & Earn</h1>
          <p className="text-sm font-bold text-[#268999]/70 mt-1">
            Track referral joins, points and your invite performance.
          </p>
        </div>

        {canDownloadReport && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#268999] text-white font-black text-sm hover:bg-[#1f7380] transition-all shadow-sm"
          >
            <Download size={16} />
            Download Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-teal-50 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F7F8] flex items-center justify-center text-[#268999] mb-4">
            <Users size={22} />
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-[#268999]/70 mb-2">
            Total Joins
          </p>
          <h3 className="text-3xl font-black text-[#1a5d68]">
            {summary?.totalJoins ?? 0}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
            <Gift size={22} />
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-orange-500/80 mb-2">
            Total Points
          </p>
          <h3 className="text-3xl font-black text-[#1a5d68]">
            {summary?.totalPoints ?? 0}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-teal-50 p-6 shadow-sm md:col-span-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F7F8] flex items-center justify-center text-[#268999] mb-4">
            <Link2 size={22} />
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-[#268999]/70 mb-2">
            Referral Code
          </p>
          <h3 className="text-2xl font-black text-[#1a5d68] mb-4">
            {summary?.referralCode || "--"}
          </h3>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 px-4 py-3 rounded-2xl border border-zinc-200 bg-zinc-50 text-sm font-bold text-zinc-700 break-all">
              {summary?.inviteUrl || "Invite URL not available"}
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-[#268999] text-[#268999] font-black text-sm hover:bg-[#268999] hover:text-white transition-all"
            >
              {isCopyDone ? <Check size={16} /> : <Copy size={16} />}
              {isCopyDone ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-teal-50 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-teal-50">
          <h2 className="text-xl font-black text-[#1a5d68]">
            Referral Join Report
          </h2>
          <p className="text-sm font-bold text-[#268999]/70 mt-1">
            Users who joined using your referral link.
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="text-lg font-black text-[#1a5d68]">No Joins Yet</h3>
            <p className="text-sm font-bold text-zinc-500 mt-2">
              Once users join from your invite URL, their onboarding data will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#F0F7F8]/60">
                <tr>
                  <th className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#268999]/80">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#268999]/80">
                    Company
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#268999]/80">
                    Joining Date
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#268999]/80">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={`${row.name}-${index}`}
                    className="border-t border-teal-50"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-[#1a5d68]">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-600">
                      {row.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-600">
                      {row.joiningDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-black bg-orange-50 text-orange-600">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

