import { Home, Briefcase, Users, Calendar, Settings, Menu, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import clsx from "clsx";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Job Openings", url: "/jobs", icon: Briefcase },
  { title: "Students", url: "/students", icon: Users },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden p-2 bg-gray-200 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Sidebar
        className={clsx(
          "fixed inset-y-0 left-0 w-64 bg-gray-100 border-r p-4 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
        )}
      >
        <SidebarContent className="flex flex-col h-full">
          <div className="p-4 font-semibold text-lg">Your Brand</div>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 text-gray-800"
                        onClick={() => setIsOpen(false)} // Close sidebar on link click
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 md:ml-64 overflow-auto">
        {children}
      </main>
    </div>
  );
}
