"use client";

import React from "react";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Projects } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectsDetailComp } from "./ProjectsDetailComp";

// ✅ React Icons
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
} from "react-icons/si";

export default function ProjectsAllComp() {
  const { data: ProjectsData } = useGetData<Projects>(
    "/api/v2/projects",
    "projects"
  );
  const [optimisticProjects] = useOptimisticList(ProjectsData || []);

  // ✅ Tech mapping
  const techIcons: Record<string, JSX.Element> = {
    react: <FaReact className="text-cyan-400 text-xl" />,
    nextjs: <SiNextdotjs className="text-white text-xl" />,
    tailwind: <SiTailwindcss className="text-sky-400 text-xl" />,
    nodejs: <FaNodeJs className="text-green-500 text-xl" />,
    javascript: <SiJavascript className="text-yellow-400 text-xl" />,
    typescript: <SiTypescript className="text-blue-400 text-xl" />,
    mongodb: <SiMongodb className="text-green-600 text-xl" />,
    postgresql: <SiPostgresql className="text-blue-500 text-xl" />,
    html: <FaHtml5 className="text-orange-500 text-xl" />,
    css: <FaCss3Alt className="text-blue-400 text-xl" />,
    python: <FaPython className="text-yellow-300 text-xl" />,
    java: <FaJava className="text-red-500 text-xl" />,
  };

  return (
    <section id="projects" className="min-h-screen text-white py-20 px-6 mt-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* ✅ Section Title */}
        <div className="flex flex-col items-center justify-center text-center mb-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-amber-300 drop-shadow-md">
              Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed"
          >
            A collection of projects I’ve built — blending creativity,
            functionality, and technical precision. Each one represents a
            milestone in my journey as a developer.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-gray-500 mt-2"
          >
            Here are some highlights from my recent work 👇
          </motion.p>
        </div>

        {/* ✅ Projects Container */}
        <div className="flex flex-wrap justify-center gap-10">
          {optimisticProjects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/10 overflow-hidden shadow-lg hover:shadow-[#FFD700]/20 hover:-translate-y-2 transition-all duration-300 w-full sm:w-[45%] lg:w-[30%]"
            >
              {/* ✅ Image Section */}
              <div className="relative w-full h-52 overflow-hidden">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.project_name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* ✅ Content Section */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-3">
                <h2 className="text-xl font-semibold text-slate-100 group-hover:text-[#FFD700] transition-colors duration-300">
                  {project.project_name}
                </h2>

                {project.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.description,
                    }}
                    className="text-sm text-gray-300 line-clamp-3"
                  />
                )}

                {/* ✅ Tech Icons */}
                {project.tech && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {project.tech
                      .split(" ")
                      .map((tech) => tech.toLowerCase().trim())
                      .map((tech, i) => (
                        <div key={i} className="flex items-center gap-1">
                          {techIcons[tech] || (
                            <span className="text-xs text-gray-400 capitalize">
                              {tech}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                )}

                {/* ✅ Buttons */}
                <div className="pt-4 mt-auto flex flex-wrap gap-3">
                  {project.live_demo_url && (
                    <Link
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFD700] text-slate-950 px-3 py-1 rounded-md text-sm font-medium hover:bg-yellow-400 transition"
                    >
                      Live Demo
                    </Link>
                  )}

                  <ProjectsDetailComp id={String(project.id)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
