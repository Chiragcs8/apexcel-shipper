"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Layers, Users, IndianRupee, BarChart2, Globe, 
  MessageSquare, Bell, Truck, Package, ShieldCheck, CreditCard 
} from "lucide-react";

const currentUserRole = "admin"; 

// Data structure completely flattened. No more subItems.
const menuData = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin", roles: ["admin", "manager"] }
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { name: "Indent", icon: <Layers size={20} />, href: "/admin/indent", roles: ["admin", "manager"] },
      { name: "Chat", icon: <MessageSquare size={20} />, href: "/admin/chat", roles: ["admin", "manager"] },
      { name: "Notifications", icon: <Bell size={20} />, href: "/admin/notifications", roles: ["admin", "manager"] },
    ]
  },
  {
    title: "USER MANAGEMENT",
    items: [
      { name: "Truckers", icon: <Truck size={20} />, href: "/admin/truckers", roles: ["admin"] },
      { name: "Shippers", icon: <Package size={20} />, href: "/admin/shippers", roles: ["admin"] },
      { name: "Users", icon: <Users size={20} />, href: "/admin/users", roles: ["admin"] },
      { name: "Admins", icon: <ShieldCheck size={20} />, href: "/admin/admins", roles: ["admin"] },
    ]
  },
  {
    title: "PRICING & ACCOUNTS",
    items: [
      { name: "Truck Rates", icon: <IndianRupee size={20} />, href: "/admin/truck-rates", roles: ["admin", "manager"] },
      { name: "Finance", icon: <CreditCard size={20} />, href: "/admin/finance", roles: ["admin", "manager"] },
    ]
  },
  {
    title: "REPORTS & INSIGHTS",
    items: [
      { name: "Reports", icon: <BarChart2 size={20} />, href: "/admin/reports", roles: ["admin", "manager"] }
    ]
  },
  {
    title: "WEBSITE MANAGEMENT",
    items: [
      { name: "Website", icon: <Globe size={20} />, href: "/admin/website", roles: ["admin"] }
    ]
  }
];

export default function AdminSidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 shadow-sm ${isSidebarOpen ? "w-72" : "w-20 lg:w-20 -translate-x-full lg:translate-x-0 absolute lg:relative h-full"}`}>
      
      {/* 1. Top Logo Section */}
      <div className="h-20 flex items-center justify-center px-6 border-b border-gray-100 shrink-0 bg-white">
        <Link href="/admin" className="flex items-center gap-3 w-full justify-center">
          <div className="relative w-10 h-10 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Apexcel Move Logo" 
              fill 
              className="object-contain"
            />
          </div>
          {isSidebarOpen && (
             <span className="text-2xl font-black tracking-tight whitespace-nowrap">
               <span className="text-orange-500">Apexcel</span> <span className="text-[#1a5d68]">Move</span>
             </span>
          )}
        </Link>
      </div>

      {/* 2. Menu List (Flat structure, NO Dropdowns) */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar bg-white">
        {menuData.map((section, idx) => {
          // Check if user has access to any item in this section
          const hasSectionAccess = section.items.some(item => item.roles.includes(currentUserRole));
          if (!hasSectionAccess) return null;

          return (
            <div key={idx}>
              {isSidebarOpen && (
                // CHANGED: text-gray-900 to text-orange-500
                <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-3 px-3">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1.5">
                {section.items.map((item, itemIdx) => {
                  if (!item.roles.includes(currentUserRole)) return null;

                  const isActive = pathname === item.href;

                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.href!}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive 
                            ? "bg-[#268999] text-white font-black shadow-md shadow-teal-900/20" 
                            : "text-gray-900 hover:bg-orange-50 hover:text-orange-600 font-bold"
                        }`}
                      >
                        <div className={`transition-colors ${
                            isActive 
                              ? "text-white" 
                              : "text-[#268999] group-hover:text-orange-600"
                          }`}
                        >
                            {item.icon}
                        </div>
                        {isSidebarOpen && <span className="text-sm tracking-wide">{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}