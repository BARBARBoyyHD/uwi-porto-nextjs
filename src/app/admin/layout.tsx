"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import Loader from "@/components/loader/Loader";
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
        <Suspense fallback={<Loader />}>
          <TanstackProvider>{children}</TanstackProvider>
          <Toaster richColors position="bottom-right" />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
