"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const currentYear = new Date().getFullYear();

interface DatePickerProps {
  label: string;
  name: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  required?: boolean; // Added required prop
}

export function DatePicker({ 
    label, 
    name, 
    value, 
    onChange, 
    fromYear = currentYear - 100, 
    toYear = currentYear + 50,
    required = false // Default to false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date: Date | undefined) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="px-1">
        {label}
        {/* Visual indicator for required field */}
        {required && <span className="text-red-500 ml-1">*</span>} 
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className="w-full justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            fromYear={fromYear}
            toYear={toYear}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* 💥 THE CRITICAL FIX: Add the required attribute to the hidden input */}
      <input
        type="hidden"
        name={name}
        value={value ? value.toISOString().split('T')[0] : ""} // Format is YYYY-MM-DD
        required={required} 
      />
    </div>
  )
}