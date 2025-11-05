// import type React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import { DashboardHeader } from "@/components/dashboard-header";
// import Providers from "@/Provider/Providers";
// import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Admin Dashboard",
//   description: "Complete admin dashboard with routing",
//   generator: "Next.js",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className} cz-shortcut-listen="true" >
//         <Providers>
//           <SidebarProvider defaultOpen={true}>
//             <div className="flex min-h-screen w-full bg-[#e6e6e6]">
//               <AppSidebar />
//               <div className="flex-1  flex flex-col ">
//                 <DashboardHeader />
//                 <Toaster />
//                 <main className="flex-1 p-6 mt-16 bg-[#e6e6e6]">{children}</main>
//               </div>
//             </div>
//           </SidebarProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }
import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import Providers from "@/Provider/Providers";
import { Toaster } from "sonner";
import AppSidebar from "@/components/app-sidebar";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Optional: include multiple weights
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Complete admin dashboard with routing",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className} cz-shortcut-listen="true">
        <Providers>
          <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full bg-[#e6e6e6] overflow-hidden">
              {/* Sidebar stays fixed */}
              <AppSidebar />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header stays fixed */}
                <div className="fixed top-0 left-[230px] right-0 z-50 bg-[#e6e6e6]">
                  <DashboardHeader />
                </div>

                {/* Scrollable content area */}
                <main className="flex-1 overflow-y-auto p-6 mt-16 bg-[#e6e6e6]">
                  {children}
                </main>

                {/* Toast notifications */}
                <Toaster />
              </div>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
