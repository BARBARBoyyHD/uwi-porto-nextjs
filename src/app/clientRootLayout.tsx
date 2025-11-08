"use client";
import { Loader } from "@/components/loader/Loader";
import { useLoader } from "@/hooks/useLoader";
import React from "react";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useLoader(); 

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
