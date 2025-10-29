"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Suspense } from "react";
import Loading from "./loading";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <SidebarTrigger />
        <Suspense fallback={<Loading />}>
          <TanstackProvider>{children}</TanstackProvider>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
