"use client";

import React from "react";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Projects } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsAllComp() {
  const { data: ProjectsData } = useGetData<Projects>(
    "/api/v2/projects",
    "projects"
  );
  const [optimisticProjects] = useOptimisticList(ProjectsData || []);

  // Only show first 6 for preview section
  const previewProjects = optimisticProjects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen text-white py-24 px-6 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full text-center space-y-12">
        {/* === Section Title === */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-amber-400">
            Projects
          </span>
        </motion.h1>

        {/* === Projects Grid === */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 place-items-center"
        >
          {previewProjects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative w-full aspect-square rounded-2xl overflow-hidden group shadow-lg shadow-black/30 hover:shadow-yellow-500/20 transition-all duration-300"
            >
              {project.image_url ? (
                <>
                  <Image
                    src={project.image_url}
                    alt={project.project_name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">
                      {project.project_name}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center bg-gray-800 w-full h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* === See More Button === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#FFD700] hover:text-amber-300 font-medium text-lg group transition-all"
          >
            See More
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
