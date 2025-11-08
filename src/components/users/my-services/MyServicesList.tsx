"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { MyServices } from "@/types/my-services";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MyServicesList() {
  const { data } = useGetData<MyServices>("/api/v2/my-services", "my-services");
  const [optimisticServices] = useOptimisticList(data || []);

  // ✅ Group services by category
  const groupedServices = optimisticServices.reduce(
    (groups: Record<string, MyServices[]>, service) => {
      const category = service.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(service);
      return groups;
    },
    {}
  );

  return (
    <section
      id="services"
      className="min-h-screen w-full text-white py-20 px-6"
    >
      {/* ✅ Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          My Services
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          I help you build fast, beautiful, and scalable web experiences — from
          front-end design to full-stack solutions.
        </p>
      </div>

      {/* ✅ Category Sections */}
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {Object.entries(groupedServices).map(
          ([category, services], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <h2 className="text-2xl md:text-3xl font-bold mb-10  border-l-4 border-slate-200 pl-3">
                {category}
              </h2>

              {/* ✅ Flexbox Cards */}
              <div className="flex flex-wrap justify-center gap-8">
                {services.map((service, index) => (
                  <SpotlightCard
                    key={index}
                    className="border border-slate-200"
                    spotlightColor="rgba(255, 215, 0, 1)"
                  >
                    <div className="flex flex-col justify-between w-70 h-[380px] rounded-xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-indigo-500/20 ">
                      {/* Title */}
                      <div>
                        <div className="leading-relaxed line-clamp-5">
                          {service.price && (
                            <p className="text-white font-bold text-2xl mb-3">
                              Rp. {service.price.toLocaleString("id-ID")} /
                              <span className="text-slate-300 font-light text-sm">
                                year
                              </span>
                            </p>
                          )}
                        </div>
                        <h3 className="text-xl font-light mb-3 text-white">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <div
                          className="text-gray-300 mb-4 leading-relaxed line-clamp-5 text-sm"
                          dangerouslySetInnerHTML={{
                            __html: service.description,
                          }}
                        />

                        {/* Price */}
                      </div>

                      {/* ✅ Order Now Button */}
                      <Link
                        href="/contact"
                        className="mt-auto inline-block text-center bg-[#FFD700] transition-colors text-shadow-slate-300 font-bold py-2 rounded-[10px] shadow-md"
                      >
                        Order Now
                      </Link>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}
