"use client";

import React from "react";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import type { Projects } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectsDetailComp } from "./ProjectsDetailComp";

export default function ProjectsAllComp() {
  const { data: ProjectsData } = useGetData<Projects>(
    "/api/v2/projects",
    "projects"
  );
  const [optimisticProjects] = useOptimisticList(ProjectsData || []);

  return (
    <section id="projects" className="min-h-screen text-white py-20 px-6 mt-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* ✅ Section Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold mb-14"
        >
          My <span className="">Projects</span>
        </motion.h1>

        {/* ✅ Projects Container — now using flex-wrap */}
        <div className="flex flex-wrap justify-center gap-10">
          {optimisticProjects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-2xl bg-slate-950/20 backdrop-blur-sm border border-slate-200 overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 w-full sm:w-[45%] lg:w-[30%]"
            >
              {/* ✅ Image Section */}
              <div className="relative w-full h-52">
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
              <div className="p-6 flex flex-col flex-grow text-left">
                <h2 className="text-xl font-semibold mb-2 text-slate-200">
                  {project.project_name}
                </h2>

                {project.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.description,
                    }}
                    className="text-sm text-gray-300 mb-4 line-clamp-3 truncate"
                  />
                )}
                {project.tech && (
                  <div className="flex flex-wrap gap-2 mb-4">
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
                      className="bg-slate-200 text-slate-950 px-3 py-1 rounded-md text-sm font-medium transition items-center"
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
