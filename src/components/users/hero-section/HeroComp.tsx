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
    <section className=" w-full min-h-screen flex flex-col items-center justify-center pt-24">
      {/* === Hero Content === */}
      {hero && (
        <motion.div className="flex flex-col items-center text-center space-y-6">
          {/* Name & Description */}
          <motion.div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileDrag={{ scale: 1.1 }}
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              drag={true} // ✅ Enables dragging
            >
              <Image
                src={hero.image_url}
                alt={hero.full_name}
                width={200}
                height={200}
                draggable={false} // 👈 Prevents browser image-drag ghost
                className="rounded-[50%] relative z-10 object-cover shadow-2xl shadow-cyan-500/20 pointer-events-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-2 flex-col md:flex-row"
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white text-4xl md:text-5xl tracking-tight drop-shadow-lg"
              >
                Hello, I am{" "}
              </motion.h1>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="md:text-5xl text-2xl"
              >
                {hero.full_name || "Your Name Here"}
              </GradientText>
            </motion.div>

            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl mt-2 max-w-lg leading-relaxed"
            >
              {hero.summary ||
                "Frontend Developer • React • Next.js • Tailwind"}
            </motion.p>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-4 flex flex-wrap justify-center md:justify-start gap-4"
            >
              <a
                href="#projects"
                className="px-6 py-2 rounded-full bg-white text-slate-950 font-medium hover:opacity-90 transition-all"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-white/40 hover:bg-white/10 transition-all font-medium"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
