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
import { DatePicker } from "@/components/datepicker";
import { usePostData } from "@/hooks/useFetch";
import type { EducationsForm } from "@/types/educations";
import TipTap from "@/components/Tiptap";

export function EducationsFormDialog() {
  const { mutate } = usePostData<EducationsForm>(
    "/api/v1/admin/educations/create",
    "educations"
  );

  const [form, setForm] = useState<EducationsForm>({
    school_name: "",
    degree: "",
    field_of_study: "",
    score: "",
    description: "",
    start_date: null,
    end_date: null,
  });

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRichTextChange = (content: string) => {
    setForm((prev) => ({ ...prev, description: content }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both Start Date and End Date.");
      return;
    }

    const payload = {
      ...form,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };
    setForm({
      school_name: "",
      degree: "",
      field_of_study: "",
      score: "",
      description: "",
      start_date: null,
      end_date: null,
    })
    mutate(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add Education
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[520px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>
              Fill out your education details below. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* School Name */}
            <div className="grid gap-2">
              <Label htmlFor="school_name">School Name</Label>
              <Input
                id="school_name"
                name="school_name"
                placeholder="e.g., Harvard University"
                value={form.school_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Degree */}
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                placeholder="e.g., Bachelor's"
                value={form.degree}
                onChange={handleChange}
                required
              />
            </div>

            {/* Field of Study */}
            <div className="grid gap-2">
              <Label htmlFor="field_of_study">Field of Study</Label>
              <Input
                id="field_of_study"
                name="field_of_study"
                placeholder="e.g., Computer Science"
                value={form.field_of_study}
                onChange={handleChange}
                required
              />
            </div>

            {/* Score */}
            <div className="grid gap-2">
              <Label htmlFor="score">Score (optional)</Label>
              <Input
                id="score"
                name="score"
                placeholder="e.g., 3.8 / 4.0"
                value={form.score}
                onChange={handleChange}
              />
            </div>

            {/* Start Date */}
            <DatePicker
              label="Start Date"
              name="start_date"
              value={startDate}
              onChange={setStartDate}
              fromYear={1980}
              required
            />

            {/* End Date */}
            <DatePicker
              label="End Date (estimated)"
              name="end_date"
              value={endDate}
              onChange={setEndDate}
              fromYear={1980}
              toYear={new Date().getFullYear() + 10}
              required
            />

            {/* Description */}
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
            <Button type="submit">Save Education</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
