"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSingleData } from "@/hooks/useFetch";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Projects } from "@/types/projects";

export function ProjectsDetailComp({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { data: project } = useGetSingleData<Projects>(
    id,
    "/api/v2/projects/get",
    "projects",
    {
      enabled: open,
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-950/20 border border-slate-200 text-slate-200 hover:bg-gray-700 hover:text-white transition-all"
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-slate-950/20 border border-slate-200 backdrop-blur-xl rounded-2xl text-gray-200 overflow-hidden shadow-2xl overflow-y-auto">
        <DialogTitle>
            
        </DialogTitle>
        {project ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <DialogHeader className="border-b border-slate-200 pb-2">
              <DialogTitle className="text-2xl font-semibold text-indigo-400">
                {project.project_name}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Project Overview
              </DialogDescription>
            </DialogHeader>

            {/* Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={project.image_url}
                alt={project.project_name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Description */}
            <div
              className="text-sm leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></div>

            {/* Footer Buttons */}
            <DialogFooter className="flex justify-between pt-4 border-t border-slate-200">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Close
                </Button>
              </DialogClose>

              <div className="flex gap-3">
                {project.live_demo_url && (
                  <Link
                    href={project.live_demo_url}
                    target="_blank"
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 rounded-md transition"
                  >
                    Live Demo
                  </Link>
                )}
              </div>
            </DialogFooter>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center py-20 text-gray-400">
            Loading project details...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
