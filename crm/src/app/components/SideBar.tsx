// components/Sidebar.tsx
"use client";
import { JSX } from "react";
import { Home, BarChart2, Calendar, Users, Activity } from "lucide-react";
import React from "react";
import Image from "next/image";

type NavItem = {
  id: string;
  icon: JSX.Element;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={20} />, label: "Home" },
  { id: "analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
  { id: "calendar", icon: <Calendar size={20} />, label: "Calendar" },
  { id: "users", icon: <Users size={20} />, label: "Users" },
  { id: "monitoring", icon: <Activity size={20} />, label: "Monitoring" },
];

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="bg-[#1A1D23] h-screen w-[80px] flex flex-col items-center py-6 rounded-r-3xl">
      {/* Logo */}
      <div className="bg-[#252A32] rounded-2xl p-4 mb-10">
        <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 w-10 h-10 rounded-2xl flex items-center justify-center">
          <Image
            src="/LOGO9.png"
            alt="Logo"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              activeTab === item.id
                ? "bg-[#2F3E4C] border-r-4 border-blue-500 text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
}
