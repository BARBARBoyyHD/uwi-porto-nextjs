"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiExpress } from "react-icons/si";
import Image from "next/image";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { HeroType } from "@/types/heroType";
export default function MyServicesHero() {
  const { data } = useGetData<HeroType>("/api/v2/hero-section", "hero-section");

  const [optimisticHero] = useOptimisticList(data || []);

  const hero = optimisticHero?.[0] ?? null;
  return (
    <section
      id="my-services"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 py-20 text-white overflow-hidden"
    >
      {/* 🧠 LEFT — Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col items-start text-center lg:text-left z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Crafting <span className="text-[#FFD700]">Modern Websites</span> &
          <br />
          <span className="text-cyan-400">Next-Level Experiences</span>
        </h1>

        <p className="text-gray-300 max-w-lg text-base md:text-lg mb-8 leading-relaxed">
          I help brands and startups turn ideas into{" "}
          <strong>beautiful, functional</strong> web experiences — from sleek
          landing pages to full-stack applications using{" "}
          <strong>Next.js</strong>, <strong>React</strong>, and{" "}
          <strong>Express.js</strong>.
        </p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#FFD700] text-slate-950 px-6 py-3 rounded-lg font-medium shadow-md shadow-yellow-500/20 transition"
        >
          Free Consultation
        </motion.a>
      </motion.div>

      {/* ⚡ RIGHT — 3D Style Card / Tech Stack Showcase */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-1/2 flex justify-center relative z-10 mt-16 lg:mt-0"
      >
        <motion.div
          whileHover={{ rotateY: 10, rotateX: 5, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative w-[320px] sm:w-[380px] md:w-[420px] bg-slate-900/40 border border-slate-700 backdrop-blur-xl p-8 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-3 text-slate-100">
            Software Engineer & Full Stack Web Developer
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center max-w-xs">
            Transforming design concepts into intuitive, scalable, and
            high-performance web apps.
          </p>

          {/* 🧰 Tech Stack Icons */}
          <div className="flex gap-5 text-3xl text-gray-300">
            <FaReact className="hover:text-cyan-400 transition" />
            <SiNextdotjs className="hover:text-white transition" />
            <SiTailwindcss className="hover:text-sky-400 transition" />
            <SiExpress className="hover:text-gray-200 transition" />
            <FaNodeJs className="hover:text-green-400 transition" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
