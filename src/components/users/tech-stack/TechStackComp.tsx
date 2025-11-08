"use client";

import { techIcons } from "@/lib/TechStack";
import { motion } from "framer-motion";

export function TechStackComp() {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-semibold text-white md:text-6xl mb-3"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My <span className="text-[#FFD700]">Tech Stack</span>
        </motion.h1>
        <p className="text-gray-400 text-sm md:text-base">
          Making Apps With Modern Technologies
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex flex-wrap justify-center gap-10 px-6 max-w-5xl mx-auto"
      >
        {techIcons.map((tech, index) => (
          <motion.a
            key={index}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-6xl md:text-7xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {tech.icon}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
