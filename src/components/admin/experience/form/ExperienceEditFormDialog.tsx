"use client";

import { DatePicker } from "@/components/datepicker";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import TipTapEdit from "@/components/TiptapEdit";
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
import { useGetSingleData, useUpdateData } from "@/hooks/useFetch";
import type { ExperienceForm } from "@/types/experience";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface ExperienceDialogFormProps {
  id: string;
}

export function ExperienceFormEditDialog({ id }: ExperienceDialogFormProps) {
  const [open, setOpen] = useState(false);

  // ✅ Fetch only when dialog opens
  const { data: experience, isLoading } = useGetSingleData<ExperienceForm>(
    id,
    "/api/v1/admin/experience/get",
    "experience",
    { enabled: open }
  );
  const { mutate } = useUpdateData<ExperienceForm>(
    "/api/v1/admin/experience/put",
    "experience"
  );

  // ✅ Local form states
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [description, setDescription] = useState("");

  const handleRichTextChange = (content: string) => {
    setDescription(content);
  };

  // ✅ Prefill form when data loads
  useEffect(() => {
    if (open && experience) {
      setCompanyName(experience.company_name || "");
      setPosition(experience.position || "");
      setIsCurrentlyWorking(experience.currently_working || false);
      setDescription(experience.description || "");
      setStartDate(
        experience.start_date ? new Date(experience.start_date) : undefined
      );
      setEndDate(
        experience.end_date ? new Date(experience.end_date) : undefined
      );
    }
  }, [open, experience]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate) return alert("Please select the Start Date.");
    if (!isCurrentlyWorking && !endDate)
      return alert("Please select the End Date.");

    const payload: ExperienceForm = {
      company_name: companyName,
      position,
      start_date: startDate.toISOString().split("T")[0],
      end_date: isCurrentlyWorking
        ? ""
        : endDate?.toISOString().split("T")[0] || "",
      description,
      currently_working: isCurrentlyWorking,
    };

    mutate({ id: id, updates: payload });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-400 hover:text-blue-300 hover:bg-zinc-700"
        >
          <FaPencilAlt size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[520px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
          <DialogDescription>
            Update your experience details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
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
                  onChange={(value) =>
                    setStartDate(
                      typeof value === "string" ? new Date(value) : value
                    )
                  }
                  fromYear={1980}
                  required
                />
              </div>

              <div className="grid gap-2">
                <DatePicker
                  label="End Date"
                  name="end_date"
                  value={endDate}
                  onChange={(value) =>
                    setEndDate(
                      typeof value === "string" ? new Date(value) : value
                    )
                  }
                  fromYear={1980}
                  toYear={new Date().getFullYear() + 20}
                  required={!isCurrentlyWorking}
                  disabled={isCurrentlyWorking}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
              
                  <TipTapEdit
                    value={description}
                    onChange={handleRichTextChange}
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
