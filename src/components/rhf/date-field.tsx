"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfDatePickerProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  /** `"date"` (default, day picker) or `"month"` for a year+month picker. */
  view?: "date" | "month"
  min?: string
  max?: string
  onChangeHandler?: (value: string) => void
}

/**
 * React Hook Form–bound date input — shadcn/Tailwind equivalent of the old
 * MUI `RHFDatePicker`. Uses the browser's native `<input type="date">` (or
 * `type="month"`) picker rather than a custom calendar popover, so the value
 * is stored as the plain ISO string the input produces (`YYYY-MM-DD` /
 * `YYYY-MM`) — parse with your date lib of choice on submit if needed.
 */
export function RhfDatePicker({
  name,
  label,
  description,
  required,
  disabled,
  className,
  view = "date",
  min,
  max,
  onChangeHandler,
}: RhfDatePickerProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={view}
              min={min}
              max={max}
              disabled={disabled}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e.target.value)
                onChangeHandler?.(e.target.value)
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
