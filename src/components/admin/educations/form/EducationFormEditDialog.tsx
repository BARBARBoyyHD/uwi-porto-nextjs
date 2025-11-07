"use client";

import { DatePicker } from "@/components/datepicker";
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
import type { Educations, EducationsForm } from "@/types/educations";
import { useEffect, useState } from "react";

import TipTapEdit from "@/components/TiptapEdit";
import { FaPencilAlt } from "react-icons/fa";
import { SpinnerLoading } from "@/components/SpinnerLoading";

interface EducationDialogFormProps {
  id: string;
}

export function EducationEditFormDialog({ id }: EducationDialogFormProps) {
  const [open, setOpen] = useState(false);

  // ✅ Fetch data only when dialog opens
  const { data, isLoading } = useGetSingleData<Educations>(
    id,
    `/api/v1/admin/educations/get`,
    "educations",
    { enabled: open }
  );
  
  const { mutate } = useUpdateData<EducationsForm>(
    "/api/v1/admin/educations/put",
    "educations"
  );

  // ✅ Form state
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

  // ✅ Fill form when data fetched
  useEffect(() => {
    if (data) {
      setForm({
        school_name: data.school_name || "",
        degree: data.degree || "",
        field_of_study: data.field_of_study || "",
        score: data.score || "",
        description: data.description || "",
        start_date: data.start_date || null,
        end_date: data.end_date || null,
      });

      // Convert to Date objects for the DatePicker
      setStartDate(data.start_date ? new Date(data.start_date) : undefined);
      setEndDate(data.end_date ? new Date(data.end_date) : undefined);
    }
  }, [data]);

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

    const payload: EducationsForm = {
      ...form,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };

    mutate({ id: id, updates: payload });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-blue-400"
          title="Edit Education"
        >
          <FaPencilAlt size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[520px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
            <DialogDescription>
              Update your education details below. Click save when done.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <SpinnerLoading />
          ) : (
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
                label="End Date"
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
                <TipTapEdit
                  value={form.description}
                  onChange={handleRichTextChange}
                />
              </div>
            </div>
          )}

          <DialogFooter>
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
