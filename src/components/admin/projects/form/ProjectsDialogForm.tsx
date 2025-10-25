"use client";

import { useState } from "react";
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
import { usePostData } from "@/hooks/useFetch";

export function ProjectsDialog() {
  const { mutate } = usePostData<FormData>("/api/v1/admin/projects/create", "projects");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    mutate(formData); // send multipart form data
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Fill out your project details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project_name">Project Name</Label>
              <Input id="project_name" name="project_name" placeholder="e.g., Portfolio Website" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" placeholder="Brief description of the project" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tech">Tech Stack</Label>
              <Input id="tech" name="tech" placeholder="e.g., Next.js, Tailwind, Supabase" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="live_demo_url">Live Demo URL</Label>
              <Input id="live_demo_url" name="live_demo_url" placeholder="https://example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Project Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
