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
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Import the pencil icon for the trigger button
// IMPORTANT: useUpdateData should typically handle PUT/PATCH
// useGetSingleData is for fetching the existing data
import { useGetSingleData, useUpdateData } from "@/hooks/useFetch";
// Assuming MyServices type is available for import
import TipTapEdit from "@/components/TiptapEdit";
import type { MyServices, MyServicesForm } from "@/types/my-services";

interface MyServicesDialogFormProps {
  id: string; // Use number type for ID if it's a numeric database ID
}

export function MyServicesEditDialog({ id }: MyServicesDialogFormProps) {
  // 1. Fetch the existing service data based on the provided ID
  const [open, setOpen] = useState(false);
  const { data: initialServiceData, refetch } = useGetSingleData<MyServices>(
    id,
    `/api/v1/admin/my-services/get/`,
    `myService`,
    { enabled: open }
  );

  // 2. Setup the mutation for UPDATING the service (using PUT/PATCH endpoint)
  // NOTE: The endpoint should point to the specific resource ID.
  const { mutate, isPending } = useUpdateData(
    `/api/v1/admin/my-services/put/`, // Use update endpoint with ID
    "myService" // Invalidate the main list on successful update
  );

  // 3. State for form fields, initialized to empty structure
  const [serviceForm, setServiceForm] = useState<MyServicesForm>({
    title: "",
    description: "",
    price: 0, // Stored as string for input
    category: "",
  });

  // 4. useEffect to synchronize fetched data with local form state
  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  useEffect(() => {
    if (initialServiceData) {
      setServiceForm({
        title: initialServiceData.title,
        description: initialServiceData.description,
        // Convert price (number) to string for the input field
        price: initialServiceData.price,
        category: initialServiceData.category,
      });
    }
  }, [initialServiceData]); // Dependency array ensures this runs when data is fetched

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (content: string) => {
    setServiceForm((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare data for the API (convert price back to a number)
    const dataToSubmit = {
      ...serviceForm,
    };

    // 5. Send the update request
    mutate({ id: id, updates: dataToSubmit }); // Pass both ID and updates
    setOpen(false); // Close dialog after submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Trigger button using the pencil icon */}
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-blue-700"
        >
          <FaPencilAlt className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Change Dialog title and description for EDITING */}
          <DialogHeader>
            <DialogTitle>Edit Service: {initialServiceData?.title}</DialogTitle>
            <DialogDescription>
              Modify the details for the selected service below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Title Input */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Service Title"
                required
                value={serviceForm.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Description (Rich Text) Input */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <TipTapEdit
                value={serviceForm.description}
                onChange={handleRichTextChange}
              />
            </div>

            {/* Price Input */}
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="text" // Keep as text to allow formatting/placeholders
                placeholder="e.g., 15000000"
                required
                value={serviceForm.price}
                onChange={handleInputChange}
              />
            </div>

            {/* Category Input */}
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Landing Page, Custom Web"
                required
                value={serviceForm.category}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            {/* Show loading state on the save button during submission */}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
