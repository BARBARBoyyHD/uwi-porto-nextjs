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
import TipTap from "@/components/Tiptap";
import type { TestimonialForm } from "@/types/testimonial";

export function TestimonialDialog() {
  const { mutate } = usePostData<FormData>(
    "/api/v1/admin/testimonial/create",
    "testimonial"
  );
  const [open, setOpen] = useState(false);

  const [testimonial, setTestimonial] = useState<TestimonialForm>({
    client_name: "",
    message: "",
    client_position: "",
    image_url: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Manually include message from TipTap
    formData.append("message", testimonial.message);
    formData.append("image_url", testimonial.image_url);
    formData.append("client_position", testimonial.client_position);
    formData.append("client_name", testimonial.client_name);

    mutate(formData, {
      onSuccess: () => {
        setOpen(false);
        setTestimonial({
          client_name: "",
          message: "",
          client_position: "",
          image_url: "",
        });
      },
    }); // send multipart form data
    setOpen(false);
  };

  const handleRichTextChange = (content: string) => {
    setTestimonial((prev) => ({ ...prev, message: content }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add testimonial
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add testimonial</DialogTitle>
            <DialogDescription>
              Fill out your testimonial details below. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* testimonial Name */}
            <div className="grid gap-2">
              <Label htmlFor="client_name">testimonial Name</Label>
              <Input
                id="client_name"
                name="client_name"
                placeholder="e.g., Portfolio Website"
                value={testimonial.client_name}
                onChange={(e) =>
                  setTestimonial((prev) => ({
                    ...prev,
                    client_name: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* message (Rich Text) */}
            <div className="grid gap-2">
              <Label htmlFor="message">message</Label>
              <TipTap onChange={handleRichTextChange} />
            </div>

            {/* client_position Stack */}
            <div className="grid gap-2">
              <Label htmlFor="client_position">client position </Label>
              <Input
                id="client_position"
                name="client_position"
                placeholder="e.g., Next.js, Tailwind, Supabase"
                value={testimonial.client_position}
                onChange={(e) =>
                  setTestimonial((prev) => ({
                    ...prev,
                    client_position: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* testimonial Image */}
            <div className="grid gap-2">
              <Label htmlFor="image">client image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save testimonial</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
