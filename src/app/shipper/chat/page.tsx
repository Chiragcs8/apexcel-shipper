"use client";

import React, { useState } from "react";
import { 
  Search, MoreVertical, Phone, Video, 
  Paperclip, Mic, Send, Smile, CheckCheck,
  Circle
} from "lucide-react";
import Image from "next/image";

// Mock Data
const CONTACTS = [
  { id: 1, name: "Kaiya George", role: "Project Manager", lastMsg: "15 mins", online: true, image: "/user.png" },
  { id: 2, name: "Lindsey Curtis", role: "Designer", lastMsg: "30 mins", online: true, image: "/user.png" },
  { id: 3, name: "Zain Geidt", role: "Content Writer", lastMsg: "45 mins", online: false, image: "/user.png" },
  { id: 4, name: "Carla George", role: "Front-end Developer", lastMsg: "2 days", online: true, image: "/user.png" },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(CONTACTS[1]); // Default to Lindsey

  return (
    <div className="px-6 py-6 md:px-10 h-[calc(100vh-100px)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-[#1a5d68]">Chat</h1>
        <nav className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex gap-2">
          <span>Home</span> <span>/</span> <span className="text-[#1a5d68]">Chat</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* LEFT SIDE: CHAT LIST (4 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-[2rem] border border-teal-50 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-teal-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#1a5d68]">Chats</h2>
            <button className="text-gray-400 hover:text-[#1a5d68]"><MoreVertical size={20}/></button>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search contact..." 
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F0F7F8]/50 border border-teal-50 focus:outline-none focus:border-[#268999] font-bold text-sm text-[#1a5d68]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-teal-100">
            {CONTACTS.map((contact) => (
              <button 
                key={contact.id}
                onClick={() => setActiveChat(contact)}
                className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${activeChat.id === contact.id ? 'bg-[#F0F7F8] border border-teal-100' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100">
                    <Image src={contact.image} alt={contact.name} fill className="object-cover" />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-[#1a5d68]">{contact.name}</p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{contact.lastMsg}</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 truncate tracking-tight">{contact.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: CHAT WINDOW (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] border border-teal-50 shadow-sm flex flex-col overflow-hidden">
          
          {/* Chat Header */}
          <div className="px-8 py-5 border-b border-teal-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative bg-gray-100">
                <Image src={activeChat.image} alt={activeChat.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1a5d68]">{activeChat.name}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeChat.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activeChat.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-[#F0F7F8] text-[#1a5d68] flex items-center justify-center hover:bg-teal-100 transition-colors"><Phone size={18}/></button>
              <button className="w-10 h-10 rounded-xl bg-[#F0F7F8] text-[#1a5d68] flex items-center justify-center hover:bg-teal-100 transition-colors"><Video size={18}/></button>
              <button className="w-10 h-10 rounded-xl bg-[#F0F7F8] text-[#1a5d68] flex items-center justify-center hover:bg-teal-100 transition-colors"><MoreVertical size={18}/></button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#F8FAFB]/50">
            {/* Received Message */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 relative mt-1">
                <Image src={activeChat.image} alt="User" fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <div className="bg-[#F0F7F8] p-4 rounded-[1.5rem] rounded-tl-none border border-teal-50 shadow-sm text-sm font-bold text-[#1a5d68] leading-relaxed">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2">Lindsey • 2 hours ago</p>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex flex-col items-end space-y-1">
              <div className="bg-[#1a5d68] p-4 rounded-[1.5rem] rounded-tr-none shadow-md text-sm font-bold text-white leading-relaxed max-w-[80%]">
                If don't like something, I'll stay away from it.
              </div>
              <div className="flex items-center gap-2 pr-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">2 hours ago</p>
                <CheckCheck size={14} className="text-[#268999]" />
              </div>
            </div>

            {/* Another Received */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 relative mt-1">
                <Image src={activeChat.image} alt="User" fill className="object-cover" />
              </div>
              <div className="bg-[#F0F7F8] p-4 rounded-[1.5rem] rounded-tl-none border border-teal-50 shadow-sm text-sm font-bold text-[#1a5d68]">
                I want more detailed information.
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="p-6 bg-white border-t border-teal-50">
            <div className="flex items-center gap-4 bg-[#F0F7F8]/50 p-2 rounded-[2rem] border border-teal-50 focus-within:border-[#268999] transition-all">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#268999]"><Smile size={22}/></button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-[#1a5d68]"
              />
              <div className="flex items-center gap-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#268999]"><Paperclip size={20}/></button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#268999]"><Mic size={20}/></button>
                <button className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center hover:bg-[#1a5d68] transition-all shadow-lg shadow-orange-500/20">
                  <Send size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}