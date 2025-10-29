"use client";

import { DatePicker } from "@/components/datepicker";
import TipTap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { ExperienceForm } from "@/types/experience";
import { useState } from "react";

export function ExperienceFormDialog() {
  const { mutate } = usePostData<ExperienceForm>(
    "/api/v1/admin/experience/create",
    "experience"
  );

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState({ description: "" });

  const handleRichTextChange = (content: string) => {
    setDescription((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate) return alert("Please select the Start Date.");
    if (!isCurrentlyWorking && !endDate)
      return alert("Please select the End Date.");

    const payload: ExperienceForm = {
      company_name: e.currentTarget.company_name.value,
      position: e.currentTarget.position.value,
      start_date: startDate.toISOString().split("T")[0], // "2025-10-27"
      end_date: isCurrentlyWorking
        ? ""
        : endDate?.toISOString().split("T")[0] || "",
      description: description.description,
      currently_working: isCurrentlyWorking,
    };

    console.log(payload.start_date, payload.end_date);
    mutate(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add Experience
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[520px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>
              Fill out your experience details below. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                placeholder="e.g., AWS, Google"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g., Software Engineer"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="currently_working"
                checked={isCurrentlyWorking}
                onCheckedChange={(checked) =>
                  setIsCurrentlyWorking(Boolean(checked))
                }
              />
              <Label htmlFor="currently_working">Currently Working?</Label>
            </div>

            <div className="grid gap-2">
              <DatePicker
                label="Start Date"
                name="start_date"
                value={startDate}
                onChange={(value) => {
                  const date =
                    typeof value === "string" ? new Date(value) : value;
                  setStartDate(date);
                }}
                fromYear={1980}
                required
              />
            </div>

            <div className="grid gap-2">
              <DatePicker
                label="End Date"
                name="end_date"
                value={endDate}
                onChange={(value) => {
                  const date =
                    typeof value === "string" ? new Date(value) : value;
                  setEndDate(date);
                }}
                fromYear={1980}
                toYear={new Date().getFullYear() + 20}
                required={!isCurrentlyWorking}
                disabled={isCurrentlyWorking}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <TipTap onChange={handleRichTextChange} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
