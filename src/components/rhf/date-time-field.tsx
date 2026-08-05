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

export interface RhfDateTimePickerProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  min?: string
  max?: string
  onChangeHandler?: (value: string) => void
}

/**
 * React Hook Form–bound date+time input — shadcn/Tailwind equivalent of the
 * old MUI `RHFDateTimePicker` (`TimePicker.tsx`). Uses the browser's native
 * `<input type="datetime-local">` picker; value is stored as the
 * `YYYY-MM-DDTHH:mm` string the input produces.
 */
export function RhfDateTimePicker({
  name,
  label,
  description,
  required,
  disabled,
  className,
  min,
  max,
  onChangeHandler,
}: RhfDateTimePickerProps) {
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
              type="datetime-local"
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
