"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, MessageSquare, Star, MapPin, Navigation, 
  BookOpen, Users, Link as LinkIcon, Search, Filter, Plus, 
  Save, Eye, CheckCircle, Clock, Edit, Trash2, Facebook, 
  Instagram, Linkedin, Twitter, Youtube, MessageCircle
} from "lucide-react";

export default function WebsiteManagementPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    { name: "Overview", icon: <LayoutDashboard size={18} /> },
    { name: "Inquiries", icon: <MessageSquare size={18} /> },
    { name: "Testimonials", icon: <Star size={18} /> },
    { name: "Branches", icon: <MapPin size={18} /> },
    { name: "POD Centers", icon: <Navigation size={18} /> },
    { name: "Glossary", icon: <BookOpen size={18} /> },
    { name: "Team", icon: <Users size={18} /> },
    { name: "Social Links", icon: <LinkIcon size={18} /> },
  ];

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-teal-50">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-black text-[#1a5d68] tracking-tight mb-2">
            Website Management
          </h1>
          <p className="text-sm font-medium text-[#268999]/80 leading-relaxed">
            Manage key public-facing website content and communication modules from a single place. Review contact inquiries, update testimonials, maintain branch details, and keep social links up to date.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden md:block mr-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated</p>
            <p className="text-xs font-bold text-[#1a5d68]">Today, 10:45 AM</p>
          </div>
          <button className="bg-[#268999] hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-teal-900/20 flex items-center gap-2">
            <Save size={16} /> Publish Changes
          </button>
        </div>
      </div>

      {/* 2. Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-teal-50 overflow-hidden">
        <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.name
                  ? "border-orange-500 text-orange-600 bg-orange-50/50"
                  : "border-transparent text-gray-500 hover:text-[#268999] hover:bg-gray-50"
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* 3. Tab Content Area */}
        <div className="p-6 bg-gray-50/30">
          
          {/* ================= TAB: OVERVIEW ================= */}
          {activeTab === "Overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-black text-[#1a5d68]">Website Overview</h2>
                <p className="text-xs font-medium text-gray-500 mt-1">Get a quick summary of all major website content sections and overall content status.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Inquiries", value: "142", color: "text-orange-500" },
                  { label: "Active Testimonials", value: "12", color: "text-[#268999]" },
                  { label: "Total Branches", value: "8", color: "text-[#1a5d68]" },
                  { label: "POD Centers", value: "24", color: "text-teal-600" },
                  { label: "Glossary Terms", value: "86", color: "text-gray-700" },
                  { label: "Team Members", value: "6", color: "text-blue-600" },
                  { label: "Pending Inquiries", value: "5", color: "text-red-500" },
                  { label: "Social Links", value: "Active", color: "text-green-500" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-teal-50 shadow-sm flex flex-col justify-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</span>
                    <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: INQUIRIES ================= */}
          {activeTab === "Inquiries" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#1a5d68]">Contact Inquiries</h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">Review and manage all website contact form submissions.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search name or email..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#268999]" />
                  </div>
                  <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Filter size={16} /> Filter
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-teal-50 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F0F7F8] text-[#1a5d68] text-xs uppercase font-black tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Name / Date</th>
                      <th className="px-6 py-4">Contact Detail</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((_, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">Rahul Sharma</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">08 Mar 2026, 2:30 PM</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-800">rahul.s@example.com</p>
                          <p className="text-xs text-gray-500">+91 9876543210</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">Looking for bulk transport from GJ to MH</td>
                        <td className="px-6 py-4">
                          <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
                            <Clock size={10} /> New
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-[#268999] hover:bg-teal-50 rounded-lg transition-colors" title="View Details"><Eye size={18} /></button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark Closed"><CheckCircle size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB: TESTIMONIALS ================= */}
          {activeTab === "Testimonials" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#1a5d68]">Testimonials Manager</h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">Add and manage customer testimonials displayed on the website.</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 h-fit">
                  <Plus size={16} /> Add Testimonial
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm relative group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden"></div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Amit Patel</h4>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Logistics Head, ABC Corp</p>
                        </div>
                      </div>
                      <div className="flex text-orange-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"Apexcel Move has transformed our freight operations. Their platform is easy to use and highly reliable."</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Active</span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Edit size={14} /></button>
                        <button className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB: BRANCHES & POD & GLOSSARY & TEAM (Generic Table View) ================= */}
          {["Branches", "POD Centers", "Glossary", "Team"].includes(activeTab) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#1a5d68]">{activeTab} Management</h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">Manage and update {activeTab.toLowerCase()} details shown across the website.</p>
                </div>
                <button className="bg-[#268999] hover:bg-teal-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 h-fit">
                  <Plus size={16} /> Add New {activeTab.split(' ')[0]}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-teal-50 shadow-sm flex items-center justify-center p-20 text-center flex-col">
                  <div className="w-16 h-16 bg-[#F0F7F8] rounded-full flex items-center justify-center text-[#268999] mb-4">
                      <Database size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{activeTab} List Layout</h3>
                  <p className="text-sm text-gray-500 max-w-sm">Admin panel table for {activeTab} will be rendered here with Edit/Delete actions.</p>
              </div>
            </div>
          )}

          {/* ================= TAB: SOCIAL LINKS ================= */}
          {activeTab === "Social Links" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
              <div>
                <h2 className="text-lg font-black text-[#1a5d68]">Social Links Manager</h2>
                <p className="text-xs font-medium text-gray-500 mt-1">Manage the website’s social media profile links and ensure all URLs are current.</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-teal-50 shadow-sm space-y-5">
                {[
                  { label: "Facebook URL", icon: <Facebook size={18} className="text-blue-600" />, placeholder: "https://facebook.com/apexcelmove" },
                  { label: "Instagram URL", icon: <Instagram size={18} className="text-pink-600" />, placeholder: "https://instagram.com/apexcelmove" },
                  { label: "LinkedIn URL", icon: <Linkedin size={18} className="text-blue-700" />, placeholder: "https://linkedin.com/company/apexcelmove" },
                  { label: "Twitter/X URL", icon: <Twitter size={18} className="text-gray-900" />, placeholder: "https://x.com/apexcelmove" },
                  { label: "YouTube URL", icon: <Youtube size={18} className="text-red-600" />, placeholder: "https://youtube.com/@apexcelmove" },
                  { label: "WhatsApp Number", icon: <MessageCircle size={18} className="text-green-500" />, placeholder: "+91 9876543210" },
                ].map((social, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label className="sm:w-48 text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                        {social.icon} {social.label}
                    </label>
                    <input 
                      type="text" 
                      placeholder={social.placeholder} 
                      className="flex-1 px-4 py-3 bg-[#F0F7F8]/50 border border-teal-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#268999] text-[#1a5d68] font-medium"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-black text-sm transition-all shadow-md">
                        Save Social Links
                    </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Quick fallback icon component for empty state
function Database({size}: {size: number}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
            <path d="M3 12A9 3 0 0 0 21 12"></path>
        </svg>
    )
}