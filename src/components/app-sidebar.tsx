"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiMessageSquare,
  FiAward,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useLogout } from "@/hooks/use-Auth";
import { FaUserTie } from "react-icons/fa6";


interface SidebarItemProps {
  name: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItemProps[] = [
  {
    name: "Hero Section",
    href: "/admin/hero-section",
    icon: FiHome,
  },
  {
    name: "My Service",
    href: "/admin/my-services",
    icon: FiSettings,
  },
  {
    name: "Educations",
    href: "/admin/educations",
    icon: FiUser,
  },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: FiBriefcase,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FiFolder,
  },
  {
    name: "Testimonial",
    href: "/admin/testimonial",
    icon: FiMessageSquare,
  },
  {
    name: "Certificates",
    href: "/admin/certificate",
    icon: FiAward,
  },
  {
    name: "Job Role",
    href: "/admin/job-role",
    icon: FaUserTie,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-background text-secondary-foreground border-r border-border w-64 flex flex-col">
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 p-2">
        <SidebarGroup className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border">
        <button
        onClick={useLogout}
          className={cn(
            "w-full flex items-center gap-3 text-sm font-medium text-muted-foreground cursor-pointer",
            "hover:text-foreground hover:bg-accent rounded-lg px-3 py-2 transition"
          )}
        >
          <FiLogOut className="h-5 w-5" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
