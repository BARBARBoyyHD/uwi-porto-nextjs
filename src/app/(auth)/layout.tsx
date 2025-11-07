"use client";

import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import Loading from "../admin/loading";

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
    <main
      className={`${geistSans.variable} ${geistMono.variable} antialiased w-full dark:bg-background dark:text-primary-foreground`}
    >
      <Suspense fallback={<Loading />}>
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster position="bottom-right"/>
      </Suspense>
    </main>
  );
}
