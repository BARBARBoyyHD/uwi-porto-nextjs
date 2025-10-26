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
import { RichTextEditor } from "@/components/richTextEditor";

export function MyServicesDialog() {
  // Assuming usePostData can handle a JSON payload now (more on this below)
  const { mutate } = usePostData("/api/v1/admin/my-services/create", "myService");
  const [open, setOpen] = useState(false);
  
  // 1. New state for all form fields
  const [service, setService] = useState({
    title: "",
    description: "", // Content from RichTextEditor
    price: "",
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (content: string) => {
    setService(prev => ({ ...prev, description: content }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 3. Construct the JSON object and send it via mutate
    // You should ensure the types match what your API expects
    mutate(service); // Sending the state object as JSON
    
    // Reset form state and close dialog
    setService({ title: "", description: "", price: "", category: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">Add Services</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[520px] overflow-y-auto ">
        <form onSubmit={handleSubmit}>
          {/* ... DialogHeader ... */}
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Service Title" 
                required 
                value={service.title} // Controlled input
                onChange={handleInputChange} 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              {/* 2. Pass value and onChange to RichTextEditor */}
              <RichTextEditor 
                value={service.description}
                onChange={handleRichTextChange} 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                name="price" 
                placeholder="e.g., Rp. 15.000.000" 
                required 
                value={service.price} // Controlled input
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category" 
                placeholder="e.g., Landing Page,Custom Web" 
                required 
                value={service.category} // Controlled input
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Services</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
