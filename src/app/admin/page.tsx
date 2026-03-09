"use client";

import React from "react";
import { Users, Truck, IndianRupee, Package } from "lucide-react";

export default function AdminDashboardPage() {
  // Dummy data for dashboard cards
  const stats = [
    { title: "Total Users", value: "3,782", icon: <Users size={24} className="text-[#268999]" />, trend: "+11.01%" },
    { title: "Total Orders", value: "5,359", icon: <Package size={24} className="text-orange-500" />, trend: "-9.05%" },
    { title: "Active Trucks", value: "1,245", icon: <Truck size={24} className="text-[#268999]" />, trend: "+4.20%" },
    { title: "Revenue", value: "₹2.4M", icon: <IndianRupee size={24} className="text-orange-500" />, trend: "+15.30%" },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a5d68]">Dashboard Overview</h1>
          <p className="text-sm font-bold text-[#268999]/70 mt-1">Welcome back, here is what's happening today.</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-teal-50 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F0F7F8] flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-xs font-black px-2 py-1 rounded-md ${
                stat.trend.startsWith("+") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              }`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-[#1a5d68]/60 text-sm font-bold uppercase tracking-widest mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-[#1a5d68]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for Charts / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-teal-50 min-h-[300px] flex flex-col items-center justify-center text-[#268999]/50">
           <p className="font-bold">Monthly Sales Chart Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-50 min-h-[300px] flex flex-col items-center justify-center text-orange-500/50">
           <p className="font-bold">Monthly Target Placeholder</p>
        </div>
      </div>

    </div>
  );
}