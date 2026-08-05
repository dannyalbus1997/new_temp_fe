"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfDateRange {
  startDate: string | null
  endDate: string | null
}

export interface RhfDateRangePickerProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  min?: string
  max?: string
  onChangeHandler?: (value: RhfDateRange) => void
}

/**
 * React Hook Form–bound date range — shadcn/Tailwind equivalent of the old
 * MUI `RHFDateRangePicker`. Two native `<input type="date">` fields bound to
 * a single `{ startDate, endDate }` object field value (both ISO `YYYY-MM-DD`
 * strings, or `null`) rather than a custom calendar popover.
 */
export function RhfDateRangePicker({
  name,
  label,
  description,
  required,
  disabled,
  className,
  min,
  max,
  onChangeHandler,
}: RhfDateRangePickerProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const range: RhfDateRange = field.value ?? { startDate: null, endDate: null }

        const update = (next: RhfDateRange) => {
          field.onChange(next)
          onChangeHandler?.(next)
        }

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  type="date"
                  aria-label="Start date"
                  min={min}
                  max={max}
                  disabled={disabled}
                  value={range.startDate ?? ""}
                  onChange={(e) => update({ ...range, startDate: e.target.value || null })}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="date"
                aria-label="End date"
                min={range.startDate ?? min}
                max={max}
                disabled={disabled}
                className={cn("flex-1")}
                value={range.endDate ?? ""}
                onChange={(e) => update({ ...range, endDate: e.target.value || null })}
                onBlur={field.onBlur}
              />
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
