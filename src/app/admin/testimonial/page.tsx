import { TestimonialDialog } from "@/components/admin/testimonial/form/TestimonialDialogForm";
import TestimonialData from "@/components/admin/testimonial/TestimonialData";
import React from "react";

export default function TestiMonialPage() {
  return (
    <section>
      <div className="flex items-center justify-between p-6">
        <h1 className="dark:text-primary-foreground text-primary font-bold text-2xl">Testimonial</h1>
        <TestimonialDialog />
      </div>
      <TestimonialData/>
    </section>
  );
}
