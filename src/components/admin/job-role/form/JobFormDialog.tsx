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
import type { JobRoleForm } from "@/types/jobroles";
import { useState } from "react";
export function JobFormDialog() {
  const [open, setOpen] = useState(false);

  const { mutate } = usePostData<JobRoleForm>(
    "/api/v1/admin/job-role/create",
    "job-role"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      role_name: e.currentTarget.role_name.value,
    };
    mutate(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add Job Role
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
