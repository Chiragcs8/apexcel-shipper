"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // <AdminRouteGuard>
      <div className="flex h-screen w-full bg-white font-sans overflow-hidden fixed inset-0 z-[100]">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar bg-white">
            {children}
          </main>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#1a5d68]/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    // </AdminRouteGuard>
  );
}