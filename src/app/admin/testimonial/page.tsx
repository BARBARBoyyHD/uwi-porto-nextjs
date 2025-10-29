import { TestimonialDialog } from "@/components/admin/testimonial/form/TestimonialDialogForm";
import TestimonialData from "@/components/admin/testimonial/TestimonialData";
import React from "react";

export default function TestiMonialPage() {
  return (
    <section>
      <div>
        <h1>Testimonial</h1>
        <TestimonialDialog />
      </div>
      <TestimonialData/>
    </section>
  );
}
