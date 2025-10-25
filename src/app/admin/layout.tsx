import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <SidebarTrigger />
        <TanstackProvider>{children}</TanstackProvider>
      </main>
    </SidebarProvider>
  );
}
