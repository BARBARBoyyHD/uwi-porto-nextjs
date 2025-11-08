"use client";

import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import React from "react";
import type { Projects } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsComp() {
  const { data: ProjectsData } = useGetData<Projects>(
    "/api/v2/projects",
    "projects"
  );
  const [optimisticProjects] = useOptimisticList(ProjectsData || []);

  return (
    <section id="projects" className="min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold mb-14 relative"
        >
          My <span className="text-[#FFD700]">Projects</span>
        </motion.h1>

        {/* ✅ Flexbox container */}
        <div className="flex flex-wrap justify-center gap-10">
          {optimisticProjects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-2xl bg-black/50 backdrop-blur-sm border border-[#FFD700] overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 w-full sm:w-[45%] lg:w-[30%] max-w-sm h-[300px]"
            >
              {/* ✅ Image Section */}
              <div className="relative w-full h-40">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.project_name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-700 text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* ✅ Content Section */}
              <div className="p-4 flex flex-col flex-grow text-left">
                <h2 className="text-xl font-semibold mb-1 text-white">
                  {project.project_name}
                </h2>

                {project.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.description,
                    }}
                    className="text-sm text-gray-300 mb-2 line-clamp-3"
                  />
                )}
                {project.tech && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.split(" ").map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-700/50 text-gray-200 text-xs px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* ✅ Action Buttons */}
                <div className="mt-auto flex flex-wrap gap-3">
                  {project.live_demo_url && (
                    <Link
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium transition"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
