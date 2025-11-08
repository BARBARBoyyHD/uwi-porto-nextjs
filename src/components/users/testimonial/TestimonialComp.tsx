"use client";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TestimonialComp() {
  const { data } = useGetData<Testimonial>(
    "/api/v2/testimonial",
    "testimonial"
  );
  const [optimisticTestimonials] = useOptimisticList(data || []);

  // Format data for InfiniteScroll
  const formattedTestimonials = optimisticTestimonials.map((t) => ({
    id: t.id,
    content: (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="p-6 bg-white/5 backdrop-blur-xl border border-[#FFD700] rounded-3xl shadow-lg max-w-sm mx-auto hover:scale-[1.02] transition-transform"
      >
        {/* Avatar */}
        {t.image_url && (
          <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-white/20">
            <Image
              src={t.image_url}
              alt={t.client_name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Name + Role */}
        <h2 className="text-lg font-semibold text-white text-center">
          {t.client_name}
        </h2>
        <p className="text-sm text-gray-400 mb-3 text-center">
          {t.client_position || "Customer"}
        </p>

        {/* Testimonial Text */}
        <div
          className="text-sm text-gray-300 text-center leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t.message }}
        ></div>
      </motion.div>
    ),
  }));

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center py-30 px-6 text-white overflow-x-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 " />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full blur-3xl" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
      >
        What <span className="text-[#FFD700]">People Say</span>
      </motion.h1>

      {/* Infinite Scroll Container */}
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl">
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
