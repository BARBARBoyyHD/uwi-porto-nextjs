"use client";

import GradientText from "@/components/GradientText";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { HeroType } from "@/types/heroType";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroComp() {
  const { data } = useGetData<HeroType>("/api/v2/hero-section", "hero-section");

  const [optimisticHero] = useOptimisticList(data || []);

  const hero = optimisticHero?.[0] ?? null;

  return (
    <section className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-16 pt-20 md:pt-24 overflow-hidden">
      {/* === Text Content === */}
      {hero && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-xl z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Hello, I’m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-amber-400">
              {hero.full_name || "Your Name Here"}
            </span>
          </h1>

          <p className="text-white/70 text-[15px] ">
            {hero.summary ||
              "Frontend Developer passionate about creating beautiful, responsive, and high-performance web experiences using React, Next.js, and Tailwind CSS."}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#projects"
              className="px-6 py-3 rounded-full bg-[#FFD700] text-slate-900 font-semibold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all"
            >
              View My Work
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#contact"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 font-medium transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      )}

      {/* === Image Section === */}
      {hero?.image_url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="relative z-10"
          dragConstraints={{
            left: -100,
            right: 100,
            top: -100,
            bottom: 100,
          }}
          drag={true}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
            <Image
              src={hero.image_url}
              alt={hero.full_name || "Profile Image"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover pointer-events-none"
              draggable={true}
            />
          </div>

          {/* Soft Glow Behind Image */}
          <div className="absolute inset-0 blur-3xl bg-cyan-500/10 rounded-full -z-10"></div>
        </motion.div>
      )}
    </section>
  );
}
