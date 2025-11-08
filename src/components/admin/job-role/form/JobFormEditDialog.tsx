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
import { useGetSingleData, useUpdateData } from "@/hooks/useFetch";
import type { JobRole, JobRoleForm } from "@/types/jobroles";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface JobFormDialogProps {
  id: string;
}

export function JobFormEditDialog({ id }: JobFormDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { data: jobRole } = useGetSingleData<JobRole>(
    id,
    "/api/v1/admin/job-role/get",
    "job-role",
    { enabled: open }
  );
  const { mutate } = useUpdateData<JobRoleForm>(
    "/api/v1/admin/job-role/put",
    "job-role"
  );

  const [role_name, setRoleName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ id: id, updates: { role_name } });
    setOpen(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  useEffect(() => {
    if (jobRole) {
      setRoleName(jobRole.role_name || "");
    }
  }, [jobRole]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Job Role</DialogTitle>
            <DialogDescription>
              {"Fill out your Job Role details below. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="role_name">Role Name</Label>
              <Input
                id="role_name"
                name="role_name"
                value={role_name}
                onChange={handleOnChange}
                placeholder="e.g., Full Stack Developer, UI/UX Designer"
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
            <Button type="submit">Save Job Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
