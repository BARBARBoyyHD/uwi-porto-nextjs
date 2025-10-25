"use client";

import { useState, useEffect } from "react";
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
import type { Projects } from "@/types/projects";
import { FaEdit } from "react-icons/fa";

interface ProjectsDialogFormProps {
  id: string;
}

export function ProjectsEditDialog({ id }: ProjectsDialogFormProps) {
  // ✅ Fetch single project data
  const { data, error, isLoading } = useGetSingleData<Projects>(
    id,
    "/api/v1/admin/projects/get",
    "projects"
  );

  // ✅ Update project hook
  const { mutate: updateProject } = useUpdateData<FormData>(
    "/api/v1/admin/projects/put",
    "projects"
  );

  // ✅ Dialog open state
  const [open, setOpen] = useState(false);

  // ✅ Controlled form state
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ Prefill form when data loads
  useEffect(() => {
    if (data) {
      setProjectName(data.project_name || "");
      setDescription(data.description || "");
      setTech(data.tech || "");
      setLiveDemoUrl(data.live_demo_url || "");
    }
  }, [data]);

  // ✅ Submit update
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("description", description);
    formData.append("tech", tech);
    formData.append("live_demo_url", liveDemoUrl);
    if (image) formData.append("image", image);

    // ✅ FIX: pass as single object, not two params
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
        {isLoading ? (
          <p className="text-center py-6 text-gray-500">Loading project...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Preview and update your project details below. Click save when
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project_name">Project Name</Label>
                <Input
                  id="project_name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tech">Tech Stack</Label>
                <Input
                  id="tech"
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="live_demo_url">Live Demo URL</Label>
                <Input
                  id="live_demo_url"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Project Image</Label>
                {data?.image_url && (
                  <img
                    src={data.image_url}
                    alt="Current project"
                    className="w-full h-40 object-cover rounded-lg border mb-2"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
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
