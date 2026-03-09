"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  LifeBuoy,
  Bug,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Loader2,
} from "lucide-react";

type CurrentAdmin = {
  id: string;
  name: string;
  designation: string;
  permissions: string[];
};

export default function SupportPage() {
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const res = await fetch("/api/admin/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok && data?.success) {
          const admin = data.admin as CurrentAdmin;
          setCurrentAdmin(admin);
          const permissions = (admin.permissions || []).map(p => p.trim());
          setHasAccess(permissions.includes("help_support.view:yes"));
        }
      } catch (error) {
        console.error("SUPPORT_PERMISSION_CHECK_ERROR", error);
      } finally {
        setLoading(false);
      }
    };
    checkPermission();
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#268999]" size={32} />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-red-50 max-w-md w-full -mt-20">
          <ShieldAlert className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-[#1a5d68] mb-2">Access Denied</h1>
          <p className="text-sm text-gray-500 font-bold">
            You do not have the <span className="text-red-500">help_support.view:yes</span> permission.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 pt-4 md:pt-6 lg:px-12 animate-in fade-in duration-500 flex flex-col justify-start">
      <div className="max-w-5xl mx-auto w-full space-y-4 md:space-y-6">
        
        {/* Header - Compact Spacing */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-100">
            <LifeBuoy size={14} className="text-orange-600" />
            <span className="text-[8px] font-black text-orange-700 uppercase tracking-widest">Support</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#1a5d68]">
            Help & <span className="text-orange-500">Support</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-bold max-w-xl mx-auto leading-tight">
            Welcome to the Apexcel Move Admin Support Center. Please contact us for technical or operational assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Support */}
          <a 
            href="mailto:admin@apexcelmove.com"
            className="bg-white rounded-[1.5rem] p-5 border border-teal-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#268999] transition-all">
                <Mail className="text-[#268999] group-hover:text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#1a5d68] mb-2">General Support</h3>
              <div className="space-y-1.5 mb-6">
                {["Admin panel usage", "System access", "Account queries"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                    <CheckCircle2 size={12} className="text-teal-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-teal-50">
              <span className="text-[8px] font-black text-[#268999] uppercase">Click to Email</span>
              <p className="text-[#1a5d68] font-black text-sm">admin@apexcelmove.com</p>
            </div>
          </a>

          {/* Technical Support */}
          <a 
            href="mailto:tech@apexcelmove.com"
            className="bg-white rounded-[1.5rem] p-5 border border-orange-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all">
                <Bug className="text-orange-500 group-hover:text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#1a5d68] mb-2">Technical Support</h3>
              <div className="space-y-1.5 mb-6">
                {["System errors & bugs", "Login issues", "Data not updating"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                    <CheckCircle2 size={12} className="text-orange-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-orange-100">
              <span className="text-[8px] font-black text-orange-600 uppercase">Click to Email</span>
              <p className="text-[#1a5d68] font-black text-sm">tech@apexcelmove.com</p>
            </div>
          </a>
        </div>

        {/* Compact Banner */}
        <div className="bg-[#1a5d68] rounded-[1.5rem] p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-black italic mb-1">Reporting Guidelines</h3>
              <p className="text-teal-100 text-[10px] font-bold opacity-80 mb-3">Include these for faster resolution:</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
                {["Admin ID", "Description", "Screenshots"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[10px] font-black">
                    <div className="w-1 h-1 rounded-full bg-orange-500" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-center min-w-[150px]">
              <div className="flex items-center justify-center gap-2 mb-1">
                 <Clock className="text-orange-400 animate-pulse w-4 h-4" />
                 <p className="text-[8px] font-black uppercase tracking-widest">Response Time</p>
              </div>
              <h4 className="text-base font-black text-orange-400">1 Business Day</h4>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
        </div>

      </div>
    </div>
  );
}