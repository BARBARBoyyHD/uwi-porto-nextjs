"use client";

import { SpinnerLoading } from "@/components/SpinnerLoading";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

// ✅ Define a type for your Hero data
interface HeroData {
  id: string;
  full_name: string;
  summary: string;
  cta: string;
  image_url?: string;
}

interface HeroEditDialogFormProps {
  id: string;
}

export function HeroEditDialogForm({ id }: HeroEditDialogFormProps) {
  // ✅ Tell your hook what type of data to expect
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetSingleData<HeroData>(
    id,
    "/api/v1/admin/hero-section/get",
    "heroSection",
    { enabled: open }
  );

  const { mutate } = useUpdateData<FormData>(
    `/api/v1/admin/hero-section/put/`,
    "heroSection"
  );

  const [fullName, setFullName] = useState("");
  const [summary, setSummary] = useState("");
  const [cta, setCta] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ Populate form with fetched data

  useEffect(() => {
    if (data) {
      setFullName(data.full_name || "");
      setSummary(data.summary || "");
      setCta(data.cta || "");
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("summary", summary);
    formData.append("cta", cta);
    if (image) formData.append("image", image);
    mutate({ id, updates: formData });
    setOpen(false);
  };

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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Hero Section</DialogTitle>
            <DialogDescription>
              Update your hero section details below and click save when done.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <SpinnerLoading />
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              {/* Full Name */}
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Summary */}
              <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Input
                  id="summary"
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>

              {/* CTA */}
              <div className="grid gap-2">
                <Label htmlFor="cta">CTA (Call to Action)</Label>
                <Input
                  id="cta"
                  name="cta"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="grid gap-2">
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />

                {data?.image_url && (
                  <div className="flex flex-col items-start mt-2">
                    <p className="text-sm text-zinc-400 mb-1">Current Image:</p>
                    <Image
                      width={28}
                      height={28}
                      src={data.image_url}
                      alt="Current Hero"
                      className="w-28 h-28 object-cover rounded-lg border border-zinc-700"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
