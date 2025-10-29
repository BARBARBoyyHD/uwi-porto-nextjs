"use client";
import React from "react";
import { useGetData, useDeleteData } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ProjectsEditDialog } from "./form/ProjectsEditsDialog";
import { DeleteComp } from "../../deleteComp";
import type { Projects } from "@/types/projects";

export default function ProjectsData() {
  const { data } = useGetData<Projects>(
    "/api/v1/admin/projects/get",
    "projects"
  );

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No Projects Found</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {data.map((project: any) => (
        <div
          key={project.id}
          className="flex flex-col justify-between w-72 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.project_name}
              className="w-full h-44 object-cover"
            />
          )}

          {/* Project Info */}
          <div className="p-5 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
              {project.project_name}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {project.tech}
            </div>

            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-auto"
              >
                Live Demo →
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center px-5 py-3 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800">
            <ProjectsEditDialog id={project.id} />
            <DeleteComp
              id={project.id}
              endpoint="/api/v1/admin/projects/delete"
              queryKey="projects"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
