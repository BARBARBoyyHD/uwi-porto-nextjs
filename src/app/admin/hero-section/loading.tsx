"use client";

import { Loader } from "@/components/loader/Loader";
import React from "react";

export default function loadingHeroSections() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
