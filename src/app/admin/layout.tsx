"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full dark:bg-background dark:text-primary-foreground`}
      >
        <SidebarTrigger />
        <Suspense fallback={<Loading />}>
          <TanstackProvider>{children}</TanstackProvider>
          <Toaster richColors position="bottom-right" />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
