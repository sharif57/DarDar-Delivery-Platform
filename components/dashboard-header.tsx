"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname(); // Get current URL path

  if (pathname === "/auth/login" || pathname === "/auth/forgot-password" || pathname === "/auth/verfiy_email" || pathname === "/auth/reset-password" || pathname === "/auth/verfiy_email") {
    return null; // Don't render sidebar for login page
  }
  return (
    <header className="bg-[#333333] text-white px-6 py-12 ">
      <div className="flex items-center justify-between">
      

  
      </div>
    </header>
  );
}
