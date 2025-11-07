"use client";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import React from "react";
import type { Testimonial } from "@/types/testimonial";
import Image from "next/image";

export default function TestimonialComp() {
  const { data } = useGetData<Testimonial>(
    "/api/v2/testimonial",
    "testimonial"
  );
  const [optimisticTestimonials] = useOptimisticList(data || []);

  // ✅ Map to InfiniteScrollItem[]
  const formattedTestimonials = optimisticTestimonials.map((t) => ({
    id: t.id,
    content: (
      <div className="p-6 bg-slate-950/20 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl max-w-sm mx-auto">
        {/* Image */}
        {t.image_url && (
          <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-slate-200">
            <Image
              src={t.image_url}
              alt={t.client_name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Name and Position */}
        <h2 className="text-lg font-semibold text-slate-100 text-center">
          {t.client_name}
        </h2>
        <p className="text-sm text-gray-400 mb-3 text-center">
          {t.client_position || "Customer"}
        </p>

        {/* Message with HTML */}
        <div
          className="text-sm text-gray-300 text-center"
          dangerouslySetInnerHTML={{ __html: t.message }}
        ></div>
      </div>
    ),
  }));

  return (
    <section id="testimonials" className="min-h-screen py-20 px-6 k text-white flex justify-center">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12 relative inline-block">
          What <span className="">People Say</span>
        </h1>

        <InfiniteScroll
          items={formattedTestimonials}
          isTilted={true}
          tiltDirection="left"
          autoplay={true}
          autoplaySpeed={0.15}
          autoplayDirection="down"
          pauseOnHover={true}
        
        />
      </div>
    </section>
  );
}
