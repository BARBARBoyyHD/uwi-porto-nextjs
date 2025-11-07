"use client";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { HeroType } from "@/types/heroType";
import Image from "next/image";

export default function AboutComp() {
  const { data } = useGetData<HeroType>(
    "/api/v1/admin/hero-section/get",
    "hero-section"
  );
  const [optimisticHero] = useOptimisticList(data || []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black/10 backdrop-blur-lg text-white px-6 md:px-16 py-24">
      {optimisticHero.map((hero, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-6xl w-full"
        >
          {/* === Left: Profile Image === */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-400 to-blue-600 rounded-[50%] shadow-2x blur-lg opacity-60 group-hover:opacity-80 transition duration-500" />
            <Image
              src={hero.image_url}
              alt={hero.full_name}
              width={250}
              height={250}
              className="rounded-[50%] relative z-10 object-cover shadow-2xl shadow-cyan-500/20"
            />
          </div>

          {/* === Right: Text Content === */}
          <div className="flex flex-col text-center md:text-left max-w-xl space-y-6">
            <h2 className="text-1xl md:text-1xl font-bold">
              I make{" "}
              <span className="bg-gradient-to-r from-[#057af0] via-[#f312c2] to-[#057af0] text-transparent bg-clip-text">
                modern web experiences I specialize in designing and developing
                responsive, high-performing digital products — from sleek
                portfolio sites to scalable web apps. My focus is crafting
                user-first interfaces powered by clean, maintainable code.
              </span>
            </h2>

            <p className="text-white/80 text-lg leading-relaxed">
              {hero.summary ||
                "I specialize in designing and developing responsive, high-performing digital products — from sleek portfolio sites to scalable web apps. My focus is crafting user-first interfaces powered by clean, maintainable code."}
            </p>

            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="#projects"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#057af0] to-[#f312c2] text-white font-medium hover:opacity-90 transition-all"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-white/40 hover:bg-white/10 transition-all font-medium"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
