"use client";

import { SpinnerLoading } from "@/components/SpinnerLoading";
import TipTapEdit from "@/components/TiptapEdit";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSingleData, useUpdateData } from "@/hooks/useFetch";
import type { Projects, ProjectsFrom } from "@/types/projects";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

interface ProjectsDialogFormProps {
  id: string;
}

export function ProjectsEditDialog({ id }: ProjectsDialogFormProps) {
  // ✅ Fetch single project data
  // ✅ Dialog open state
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetSingleData<Projects>(
    id,
    "/api/v1/admin/projects/get",
    "projects",
    { enabled: open }
  );

  // ✅ Update project hook
  const { mutate: updateProject } = useUpdateData<FormData>(
    "/api/v1/admin/projects/put",
    "projects"
  );

  // ✅ Controlled form state
  const [project, setProject] = useState<ProjectsFrom>({
    project_name: "",
    description: "",
    tech: "",
    image_url: "",
    live_demo_url: "",
  });
  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);
  // ✅ Prefill form when data loads
  useEffect(() => {
    if (data) {
      setProject({
        project_name: data.project_name || "",
        description: data.description || "",
        tech: data.tech || "",
        image_url: data.image_url || "",
        live_demo_url: data.live_demo_url || "",
      });
    }
  }, [data]);

  // ✅ Handle TipTap content change
  const handleRichTextChange = (content: string) => {
    setProject((prev) => ({ ...prev, description: content }));
  };

  // ✅ Submit update
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Include updated description from TipTap
    formData.append("description", project.description);

    // Send multipart form data
    updateProject({ id, updates: formData });
    setOpen(false);
  };

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Failed to load project data.
      </p>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-400 hover:text-blue-300 hover:bg-zinc-700"
        >
          <FaEdit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project details below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <SpinnerLoading/>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Project Name */}
              <div className="grid gap-2">
                <Label htmlFor="project_name">Project Name</Label>
                <Input
                  id="project_name"
                  name="project_name"
                  value={project.project_name}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      project_name: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <TipTapEdit
                  value={project.description}
                  onChange={handleRichTextChange}
                />
              </div>

              {/* Tech Stack */}
              <div className="grid gap-2">
                <Label htmlFor="tech">Tech Stack</Label>
                <Input
                  id="tech"
                  name="tech"
                  value={project.tech}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, tech: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Live Demo URL */}
              <div className="grid gap-2">
                <Label htmlFor="live_demo_url">Live Demo URL</Label>
                <Input
                  id="live_demo_url"
                  name="live_demo_url"
                  value={project.live_demo_url}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      live_demo_url: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Image */}
              <div className="grid gap-2">
                <Label htmlFor="image">Project Image</Label>
                {data?.image_url && (
                  <img
                    src={data.image_url}
                    alt="Current project"
                    className="w-full h-40 object-cover rounded-lg border mb-2"
                  />
                )}
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
