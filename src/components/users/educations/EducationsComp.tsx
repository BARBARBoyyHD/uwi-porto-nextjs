"use client";

import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Educations } from "@/types/educations";
import { motion } from "framer-motion";

export default function EducationsComp() {
  const { data } = useGetData<Educations>("/api/v2/educations", "educations");
  const [optimisticEducations] = useOptimisticList(data || []);

  return (
    <motion.div
      id="Educations"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="min-h-[70vh] w-full flex flex-col items-center justify-center p-8 md:px-14 md:py-24"
    >
      <motion.h1
        className="text-4xl font-semibold text-white md:text-6xl mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        My
        <span className=""> Education</span>
      </motion.h1>

      <div className="relative w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 w-1 bg-white h-full transform -translate-x-1/2"></div>

        {/* Timeline Items */}
        <ul className="space-y-12">
          {optimisticEducations.map((item, index) => (
            <motion.li
              key={item.id}
              className={`relative flex items-center justify-between w-full ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              {/* Left side (year, school, degree) */}
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "text-left pl-6" : "text-right pr-6"
                }`}
              >
                <h2 className="text-xl font-bold text-slate-200">
                  {new Date(item.start_date || "").getFullYear()} -{" "}
                  {item.end_date
                    ? new Date(item.end_date).getFullYear()
                    : "Present"}
                </h2>
                <p className="text-white font-semibold mt-1">
                  {item.school_name}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {item.degree} — {item.field_of_study}
                </p>
              </div>

              {/* Indicator dot */}
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shadow-lg">
                <motion.div
                  className="w-4 h-4 bg-black rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                />
              </div>

              {/* Right side (description) */}
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "text-right pr-6" : "text-left pl-6"
                }`}
              >
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
                {item.score && (
                  <p className="text-gray-400 text-sm mt-2">
                    Score: <span className="text-gray-200">{item.score}</span>
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
