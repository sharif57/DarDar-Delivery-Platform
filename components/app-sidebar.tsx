// "use client";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import {
//   LayoutDashboard,
//   Users,
//   Trophy,
//   Newspaper,
//   MessageSquare,
//                 ShoppingBag,
//   Settings,
//   LogOut,
//   Bell,
//   List,
//   User,
//   Bike,
//   ImageIcon,
//   Package,
//   Plus,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Logo from "./logo";
// import { logout } from "@/service/authService";
// import { toast } from "sonner";
// import { useEffect } from "react";

// const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const storedRole = localStorage.getItem("userRole");
//     if (storedRole) setRole(storedRole);
//   }, []);

//   // --- Define menu items based on role ---
//   const vendorMenu: MenuItem[] = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
//     { id: "manage-products", label: "Manage Products", icon: Package, href: "/manage-products" },
//     { id: "add-products", label: "Add Products", icon: Plus, href: "/add-products" },
//     { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
//     { id: "profile", label: "Profile", icon: User, href: "/profile" },
//   ];

//   const superAdminMenu: MenuItem[] = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
//     { id: "total-order", label: "Total Order", icon: List, href: "/total-order" },
//     { id: "make-admin", label: "Make Admin", icon: User, href: "/make-admin" },
//     { id: "rider-request", label: "Rider Request", icon: Bike, href: "/rider-request" },
//     { id: "feedback", label: "Feedback", icon: MessageSquare, href: "/feedback" },
//     { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
//     { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
//   ];

// export function AppSidebar() {
//   const pathname = usePathname(); // Get current URL path
//   const router = useRouter();

//   if (
//     pathname === "/auth/login" ||
//     pathname === "/auth/forgot-password" ||
//     pathname === "/auth/verfiy_email" ||
//     pathname === "/auth/reset-password"
//   ) {
//     return null; // Don't render sidebar for login page
//   }

//   const handleLogout = async () => {
//     try {
//       await logout();
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userRole");
//       toast.success("Logout successfully");
//       router.push("/auth/login");
//     } catch (error) {
//       // console.error("Failed to logout:", error);
//       toast.error("Failed to logout");
//     }
//   }

//   return (
//     <Sidebar className=" ">
//       <SidebarHeader className="p-4 pt-10">
//         <Link href="/" className="flex items-center justify-center gap-2">
//           <Logo />
//         </Link>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.url}
//                       className={`flex items-center gap-3 px-6 py-5  text-[20px] rounded-full ${
//                         pathname === item.url
//                           ? "bg-[#D69D21]  text-[20px] text-white"
//                           : "hover:bg-[#D69D21] hover:text-black "
//                       }`}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="p-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               {/* <Link href={"/auth/login"}> */}
//                 <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50">
//                   <LogOut className="w-5 h-5" />
//                   <span>Log out</span>
//                 </button>
//               {/* </Link> */}
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Image from "next/image";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   Trophy,
//   Newspaper,
//   MessageSquare,
//   ShoppingBag,
//   Settings,
//   LogOut,
//   Bell,
//   List,
//   User,
//   Bike,
//   ImageIcon,
//   Package,
//   Plus,
//   ChevronDown,
//   Grid3x3,
// } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { toast } from "sonner";
// import { logout } from "@/service/authService";

// interface MenuItem {
//   id: string;
//   label: string;
//   icon: React.ComponentType<any>;
//   href: string;
// }

//  function Sidebar() {
//   const [role, setRole] = useState<string | null>(null);
//   const [expandedCategory, setExpandedCategory] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const typeParam = searchParams.get("type");

//   // Hide sidebar on auth pages
//   if (
//     pathname === "/auth/login" ||
//     pathname === "/auth/forgot-password" ||
//     pathname === "/auth/verify_email" ||
//     pathname === "/auth/reset-password"
//   ) {
//     return null;
//   }

//   // Load role from localStorage
//   useEffect(() => {
//     const storedRole = localStorage.getItem("userRole");
//     if (storedRole) {
//       setRole(storedRole);
//     }
//   }, []);

//   // Define menu items
//   const vendorMenu: MenuItem[] = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
//     {
//       id: "manage-products",
//       label: "Manage Products",
//       icon: Package,
//       href: "/manage-products",
//     },
//     { id: "add-products", label: "Add Products", icon: Plus, href: "/add-products" },
//     { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
//     { id: "profile", label: "Profile", icon: User, href: "/profile" },
//   ];

//   const superAdminMenu: MenuItem[] = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
//     { id: "total-order", label: "Total Order", icon: List, href: "/total-order" },
//     { id: "make-admin", label: "Make Admin", icon: User, href: "/make-admin" },
//     { id: "rider-request", label: "Rider Request", icon: Bike, href: "/rider-request" },
//     { id: "feedback", label: "Feedback", icon: MessageSquare, href: "/feedback" },
//     { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
//     { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
//   ];

//   const subCategories = [
//     { id: "food", label: "Food" },
//     { id: "drinks", label: "Drinks" },
//     { id: "snacks", label: "Snacks" },
//   ];

//   // Menu based on role
//   const menuItems: MenuItem[] =
//     role === "super-admin" ? superAdminMenu : role === "vendor" ? vendorMenu : [];

//   const isAnySubCategoryActive = subCategories.some((sub) => sub.id === typeParam);

//   // Handle sub-category click
//   const handleSubCategoryClick = (id: string) => {
//     router.push(`/category?type=${id}`);
//   };

//   // Logout Handler
//   const handleLogout = async () => {
//     try {
//       await logout();
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userRole");
//       toast.success("Logged out successfully");
//       router.push("/auth/login");
//     } catch (error) {
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <div className="w-[230px] bg-[#333333] text-white flex flex-col h-screen">
//       {/* Logo */}
//       <div className="p-4 flex items-end justify-end">
//         <Image
//           src="/logo.png"
//           alt="Logo"
//           width={132}
//           height={100}
//           className="w-[132px] h-[100px]"
//         />
//       </div>

//       {/* Menu */}
//       <div className="pl-8 flex-1 overflow-y-auto">
//         <nav className="py-4">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const active = pathname === item.href;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => router.push(item.href)}
//                 className={`w-full px-4 py-4 flex items-center mb-4 gap-3 text-sm rounded-r-lg font-medium transition-colors ${
//                   active
//                     ? "bg-[#89B12C] text-white"
//                     : "text-[#333333] bg-[#E1E1E1] hover:bg-[#e1e1e1]/90"
//                 }`}
//               >
//                 <Icon size={18} />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}

//           {/* Category (only for vendor) */}
//           {role === "vendor" && (
//             <Collapsible open={expandedCategory} onOpenChange={setExpandedCategory}>
//               <CollapsibleTrigger
//                 className={`w-full px-4 py-3 flex items-center gap-3 text-sm font-medium rounded-r-lg transition-colors ${
//                   isAnySubCategoryActive
//                     ? "bg-[#89B12C] text-white"
//                     : "bg-[#E1E1E1] text-black hover:bg-[#e1e1e1]/90"
//                 }`}
//               >
//                 <Grid3x3 size={18} />
//                 <span>Category</span>
//                 <ChevronDown
//                   size={16}
//                   className={`ml-auto transition-transform ${
//                     expandedCategory ? "rotate-180" : ""
//                   }`}
//                 />
//               </CollapsibleTrigger>

//               <CollapsibleContent className="bg-[#E1E1E1] border-t border-gray-600">
//                 {subCategories.map((subCat) => (
//                   <button
//                     key={subCat.id}
//                     onClick={() => handleSubCategoryClick(subCat.id)}
//                     className={`w-full px-8 py-4 text-xs font-medium text-left transition-colors ${
//                       subCat.id === typeParam
//                         ? "bg-[#B9D774] text-[#333333]"
//                         : "text-[#333333] hover:bg-[#E1E1E1]/90"
//                     }`}
//                   >
//                     • {subCat.label}
//                   </button>
//                 ))}
//               </CollapsibleContent>
//             </Collapsible>
//           )}
//         </nav>
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="w-full px-4 py-3 flex items-center gap-3 text-sm font-medium text-gray-300 hover:bg-gray-700 rounded transition-colors"
//         >
//           <LogOut size={18} />
//           <span>Log Out</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function AppSidebar(){
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Sidebar />
//     </Suspense>
//   )
// };

"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  Bike,
  ImageIcon,
  Settings,
  List,
  Package,
  Plus,
  ChevronDown,
  Grid3x3,
  LogOut,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { logout } from "@/service/authService";
import { useUserProfileQuery } from "@/redux/feature/userSlice";
import Link from "next/link";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

function Sidebar() {
  const [role, setRole] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState(false);

  const { data } = useUserProfileQuery(undefined);
  // console.log(data?.data, '=============!!')

  // ✔ Hooks must run FIRST
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  // Load role
  // useEffect(() => {
  //   const storedRole = localStorage.getItem("userRole");
  //   if (storedRole) setRole(storedRole);
  // }, []);

  // ✔ AFTER HOOKS → Safe early return
  const hideSidebarPaths = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/verify_email",
    "/auth/reset-password",
  ];

  if (hideSidebarPaths.includes(pathname)) {
    return null;
  }

  // Sidebar menus
  const vendorMenu: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "manage-products", label: "Manage Products", icon: Package, href: "/manage-products" },
    { id: "add-products", label: "Add Products", icon: Plus, href: "/add-products" },
    { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ];

  const superAdminMenu: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "total-order", label: "Total Order", icon: List, href: "/total-order" },
    { id: "make-admin", label: "Make Vendor", icon: User, href: "/make-admin" },
    { id: "rider-request", label: "Rider Request", icon: Bike, href: "/rider-request" },
    { id: "feedback", label: "Feedback", icon: MessageSquare, href: "/feedback" },
    { id: "banner", label: "Banner Section", icon: ImageIcon, href: "/banner" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const subCategories = [
    { id: "category", label: "Category", link: "/category" },
    { id: "sub-category", label: "Sub Category", link: "/category/sub-category" },
  ];

  const menuItems =
    // role === "super-admin" ? superAdminMenu : role === data?.data?.role ? vendorMenu : [];
    data?.data?.role === 'ADMIN' ? superAdminMenu : data?.data?.role === "VENDOR" ? vendorMenu : [];

  const isAnySubCategoryActive = subCategories.some((s) => s.id === typeParam);

  const handleSubCategoryClick = (id: string) => {
    router.push(`/category?type=${id}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="w-[230px] bg-[#333333] text-white flex flex-col h-screen">
      <div className="p-4 flex items-end justify-end">
        <Image src="/logo.png" alt="Logo" width={132} height={100} />
      </div>

      <div className="pl-8 flex-1 overflow-y-auto">
        <nav className="py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`w-full px-4 py-4 flex items-center mb-4 gap-3 text-sm rounded-r-lg font-medium transition-colors ${active
                  ? "bg-[#89B12C] text-white"
                  : "text-[#333333] bg-[#E1E1E1] hover:bg-[#e1e1e1]/90"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          {/* Category */}
          {data?.data?.role === "VENDOR" && (
            <Collapsible open={expandedCategory} onOpenChange={setExpandedCategory}>
              <CollapsibleTrigger
                className={`w-full px-4 py-3 flex items-center gap-3 text-sm rounded-r-lg ${isAnySubCategoryActive
                  ? "bg-[#89B12C] text-white"
                  : "bg-[#E1E1E1] text-black hover:bg-[#e1e1e1]/90"
                  }`}
              >
                <Grid3x3 size={18} /> Category
                <ChevronDown
                  className={`ml-auto transition-transform ${expandedCategory ? "rotate-180" : ""
                    }`}
                />
              </CollapsibleTrigger>

              {/* <CollapsibleContent className="bg-[#E1E1E1] border-t border-gray-600">
                {subCategories.map((sub) => (
                  <Link key={sub.id} href={sub?.link}>
                    <button
                      key={sub.id}
                      onClick={() => handleSubCategoryClick(sub.id)}
                      className={`w-full px-8 py-4 text-xs text-left ${sub.id === typeParam
                        ? "bg-[#B9D774] text-[#333333]"
                        : "hover:bg-[#E1E1E1]/90 text-black"
                        }`}
                    >
                      {sub.label}
                    </button>
                  </Link>
                ))}
              </CollapsibleContent> */}
              <CollapsibleContent className="bg-[#E1E1E1] border-t border-gray-600">
                {subCategories.map((sub) => {
                  const isActive = pathname === sub.link; // check active link

                  return (
                    <Link key={sub.id} href={sub.link}>
                      <button
                        onClick={() => handleSubCategoryClick(sub.id)}
                        className={`w-full px-8 py-4 text-xs text-left ${isActive
                            ? "bg-[#B9D774] text-[#333333]" // active tab
                            : "hover:bg-[#E1E1E1]/90 text-black"
                          }`}
                      >
                        {sub.label}
                      </button>
                    </Link>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-300 hover:bg-gray-700 rounded"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
}

export default function AppSidebar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sidebar />
    </Suspense>
  );
}
