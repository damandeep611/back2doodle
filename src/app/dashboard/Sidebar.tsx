"use client";
import {
  ChevronDown,
  DatabaseZap,
  FlaskConical,
  HelpCircleIcon,
  LayoutDashboard,
  LayoutTemplate,
  LucideIcon,
  PanelRightOpen,
  PictureInPicture,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarTypes {
  icon: LucideIcon;
  title: string;
  href: string;
}

const SidebarItems: SidebarTypes[] = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/dashboard" },
  {
    icon: PictureInPicture,
    title: "Image Generator",
    href: "/dashboard/image-generator",
  },
  { icon: DatabaseZap, title: "Prompts base", href: "/promptbase" },
  { icon: LayoutTemplate, title: "Templates", href: "/templates" },
  { icon: Settings, title: "Settings", href: "/dashboard/setting" },
  { icon: HelpCircleIcon, title: "Help", href: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-[256px] flex flex-col relative   p-4 border-r border-gray-200 h-screen  top-0  overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between gap-2">
          <Image
            width="30"
            height="30"
            src="https://img.icons8.com/external-doodle-bomsymbols-/91/external-doodle-doodle-general-office-doodle-bomsymbols--12.png"
            alt="external-doodle-doodle-general-office-doodle-bomsymbols--12"
          />
          <span className="text-sm font-semibold">back2doodle</span>
        </div>
        <PanelRightOpen size={18} className="text-zinc-600" />
      </div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Quick search"
          className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
          ⌘K
        </span>
      </div>
      {/* checkout prompt libraries  */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-200 text-blue-500 py-2 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        <FlaskConical size={16} />
        Credits: 250
      </motion.button>
      <span className="text-sm text-zinc-500 pt-6 p-2">Menu</span>
      <div className="flex-1 flex flex-col  items-start  gap-2 py-2">
        {SidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={`flex items-center gap-2  w-full p-2 rounded-sm ${
                isActive
                  ? "bg-blue-100 text-blue-500 border-l-2 border-blue-500"
                  : "text-zinc-600 hover:bg-gray-100"
              }`}
            >
              <item.icon
                size={16}
                className={isActive ? "text-blue-500" : "text-gray-900"}
              />
              <span className="text-sm  font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="p-2 border-t border-gray-200 ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">D</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              Dario Altman
            </div>
            <div className="text-xs text-gray-500">xai@crypto.com</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
