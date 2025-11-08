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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostData } from "@/hooks/useFetch";
import { useState } from "react";

export function HeroSectionDialog() {
  const { mutate } = usePostData<FormData>("/api/v1/admin/hero-section/create", "heroSection");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    mutate(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">Add Hero</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Hero Section</DialogTitle>
            <DialogDescription>
             {" Fill out your hero section details below. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" placeholder="Your name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Input
                id="summary"
                name="summary"
                placeholder="Short description or tagline"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cta">CTA (Call to Action)</Label>
              <Input id="cta" name="cta" placeholder="e.g., Contact Me" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Hero</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
