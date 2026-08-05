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

export interface RhfTimePickerProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  /** In seconds, e.g. `1` to allow seconds precision. Native default is minute precision. */
  step?: number
  min?: string
  max?: string
  onChangeHandler?: (value: string) => void
}

/**
 * React Hook Form–bound time input — shadcn/Tailwind equivalent of the old
 * MUI `RHFOnlyTimePicker` / `RhfBasicTimePicker`. Uses the browser's native
 * `<input type="time">` picker; value is stored as the `HH:mm` (or `HH:mm:ss`
 * with `step`) string the input produces.
 */
export function RhfTimePicker({
  name,
  label,
  description,
  required,
  disabled,
  className,
  step,
  min,
  max,
  onChangeHandler,
}: RhfTimePickerProps) {
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
              type="time"
              step={step}
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
