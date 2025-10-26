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
import { DatePicker } from "@/components/datepicker"; // Your custom DatePicker component

export function CertificateFormDialog() {
  const { mutate } = usePostData<FormData>(
    "/api/v1/admin/certificate/create",
    "certificate"
  );
  
  // State for the dates is essential for the DatePicker component
  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🚀 THE CRITICAL FIX: Explicit Client-Side Validation
    // This check ensures 'issueDate' and 'expirationDate' are set (not undefined)
    // before allowing the form data to be created and mutated.
    if (!issueDate || !expirationDate) {
      alert("Please select both Issue Date and Expiration Date.");
      return; // STOP submission, preventing the 400 Bad Request
    }
    
    // Now that we know the dates are valid, the hidden inputs will contain
    // the correct YYYY-MM-DD strings for the backend.
    const form = e.currentTarget;
    const formData = new FormData(form);

    mutate(formData);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          Add Certificate
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[520px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Certificate</DialogTitle>
            <DialogDescription>
              Fill out your certificate details below. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Certificate Name */}
            <div className="grid gap-2">
              <Label htmlFor="cert_name">Certificate Name</Label>
              <Input
                id="cert_name"
                name="cert_name"
                placeholder="e.g., React Developer"
                required
              />
            </div>

            {/* Issuer */}
            <div className="grid gap-2">
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                name="issuer"
                placeholder="e.g., Meta, Coursera"
                required
              />
            </div>

            {/* Issue Date */}
            <DatePicker
              label="Issue Date"
              name="issuer_date"
              value={issueDate}
              onChange={setIssueDate}
              fromYear={1980}
              required={true}
            />

            {/* Expiration Date */}
            <DatePicker
              label="Expiration Date"
              name="expiration_date"
              value={expirationDate}
              onChange={setExpirationDate}
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 20}
              required={true}
            />

            {/* Certificate URL */}
            <div className="grid gap-2">
              <Label htmlFor="cert_url">Certificate URL</Label>
              <Input
                id="cert_url"
                name="cert_url"
                type="url"
                placeholder="https://example.com/certificate"
                required
              />
            </div>

            {/* Certificate Image */}
            <div className="grid gap-2">
              <Label htmlFor="image">Certificate Image</Label>
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
            <Button type="submit">Save Certificate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}