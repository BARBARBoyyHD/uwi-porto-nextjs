import { HeroSectionDialog } from "@/components/admin/hero-section/form/HerodialogForm";
import HeroData from "@/components/admin/hero-section/heroData";
import React from "react";

export default function HeroSection() {
  return (
    <section className=" border-black">
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="dark:text-primary-foreground text-primary font-bold text-2xl">Hero Section</h1>
        <HeroSectionDialog />
      </div>
      <HeroData/>
    </section>
  );
}
