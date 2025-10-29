"use client";

import { useGetData } from "@/hooks/useFetch";
import React from "react";
import type { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { DeleteComp } from "../../deleteComp";
import { TestimonialEditDialog } from "./form/TestimonialEditDialog";

export default function TestimonialData() {
  const { data, isLoading } = useGetData<Testimonial>(
    "/api/v1/admin/testimonial/get",
    "testimonial"
  );

  const [optimisticTestimonials] = useOptimisticList<Testimonial>(data || []);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-[200px]">
        <SpinnerLoading />
      </section>
    );
  }

  if (
    !optimisticTestimonials ||
    !Array.isArray(optimisticTestimonials) ||
    optimisticTestimonials.length === 0
  ) {
    return (
      <section className="text-center py-10 text-gray-500">
        No testimonials found.
      </section>
    );
  }

  return (
    <section className="flex flex-wrap p-6">
      {optimisticTestimonials.map((testimonial) => (
        <div key={testimonial.id} className="w-full sm:w-1/2 lg:w-1/3 p-3">
          <div className="h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {testimonial.client_name}
              </h3>

              <div
                className="text-gray-600 mb-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: testimonial.message || "",
                }}
              />

              <p className="text-lg font-bold text-gray-900 mb-4">
                {testimonial.client_position}
              </p>
            </div>

            <div className="p-6 pt-0 flex items-center gap-3">
              {testimonial.image_url && (
                <Image
                  src={testimonial.image_url}
                  alt={testimonial.client_name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <p className="text-sm leading-5 font-medium text-indigo-600">
                {testimonial.client_name}
              </p>
            </div>
            <div>
              <DeleteComp
                id={testimonial.id}
                endpoint="/api/v1/admin/testimonial/delete"
                queryKey="testimonial"
              />
              <TestimonialEditDialog id={testimonial.id} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
