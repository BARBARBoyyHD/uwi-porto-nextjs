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
import type { Testimonial, TestimonialForm } from "@/types/testimonial";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

interface TestimonialDialogFormProps {
  id: string;
}

export function TestimonialEditDialog({ id }: TestimonialDialogFormProps) {
  // ✅ Fetch single testimonial data
  // ✅ Dialog open state
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetSingleData<Testimonial>(
    id,
    "/api/v1/admin/testimonial/get",
    "testimonial",
    { enabled: open }
  );
  // ✅ Update testimonial hook
  const { mutate: updatetestimonial } = useUpdateData<FormData>(
    "/api/v1/admin/testimonial/put",
    "testimonial"
  );

  // ✅ Controlled form state
  const [testimonial, setTestimonial] = useState<TestimonialForm>({
    client_name: "",
    message: "",
    client_position: "",
    image_url: "",
  });

  // ✅ Prefill form when data loads
  useEffect(() => {
    if (data) {
      setTestimonial({
        client_name: data.client_name || "",
        message: data.message || "",
        client_position: data.client_position || "",
        image_url: data.image_url || "",
      });
    }
  }, [data]);

  // ✅ Handle TipTap content change
  const handleRichTextChange = (content: string) => {
    setTestimonial((prev) => ({ ...prev, message: content }));
  };

  // ✅ Submit update
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Include updatedmessage from TipTap
    formData.append("message", testimonial.message);

    // Send multipart form data
    updatetestimonial({ id, updates: formData });
    setOpen(false);
  };

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Failed to load testimonial data.
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
          <DialogTitle>Edit testimonial</DialogTitle>
          <DialogDescription>
            Update your testimonial details below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div>
            <SpinnerLoading />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* testimonial Name */}
              <div className="grid gap-2">
                <Label htmlFor="client_name">testimonial Name</Label>
                <Input
                  id="client_name"
                  name="client_name"
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

              {/*message */}
              <div className="grid gap-2">
                <Label htmlFor="message">message</Label>
                <TipTapEdit
                  value={testimonial.message}
                  onChange={handleRichTextChange}
                />
              </div>

              {/* client_position Stack */}
              <div className="grid gap-2">
                <Label htmlFor="client_position">client position</Label>
                <Input
                  id="client_position"
                  name="client_position"
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

              {/* Image */}
              <div className="grid gap-2">
                <Label htmlFor="image">client Image</Label>
                {data?.image_url && (
                  <img
                    src={data.image_url}
                    alt="Current client"
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
