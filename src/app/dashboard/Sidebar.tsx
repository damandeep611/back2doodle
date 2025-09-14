import { DatabaseZap, HelpCircleIcon,  Image, LayoutDashboard, LayoutTemplate, LucideIcon, PanelRightOpen, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarTypes {
  icon: LucideIcon;
  title: string;
  href: string
}

const SidebarItems: SidebarTypes[] = [
  {icon: LayoutDashboard, title: "Dashboard", href: "/"},
  {icon: Image, title: "Image Generator", href: "/dashboard"},
  {icon: DatabaseZap, title: "Prompts base", href: "/promptbase"},
  {icon: LayoutTemplate, title: "Templates", href: "/templates"}, 
  {icon: Settings, title: "Settings", href: "/settings"},
  {icon: HelpCircleIcon, title: "Help", href: "/help"}
]

export default function Sidebar() {
  return (
    <div className="w-[256px] p-4 border-r border-gray-200 h-screen top-0 sticky overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <img width="30" height="30" src="https://img.icons8.com/external-doodle-bomsymbols-/91/external-doodle-doodle-general-office-doodle-bomsymbols--12.png" alt="external-doodle-doodle-general-office-doodle-bomsymbols--12"/>
          <span className="text-2xl font-semibold">back2doodle</span>
        </div>
        <PanelRightOpen size={18} />
      </div>
     <div className="flex flex-col items-start justify-center gap-2 py-8">
       {SidebarItems.map((item)=> (
        <Link href={item.href} key={item.href} className="flex items-center gap-2 hover:bg-gray-100 w-full p-2 rounded-md">
          <item.icon size={18}/>
        <span className="text-sm font-medium">
          {item.title}
        </span>
        </Link>
      ))}
     </div>

    </div>
  );
}
