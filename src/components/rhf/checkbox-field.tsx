"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfCheckboxProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
}

/**
 * React Hook Form–bound single checkbox — shadcn/Tailwind equivalent of the
 * old MUI `RhfCheckbox`. Bound to a boolean field value; the label renders
 * inline to the right of the checkbox (not bold), same as the MUI original's
 * `FormControlLabel` layout.
 */
export function RhfCheckbox({
  name,
  label,
  description,
  required,
  disabled,
  className,
}: RhfCheckboxProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {label && (
              <FormLabel className="font-normal">
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export interface RhfMultiCheckboxOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export interface RhfMultiCheckboxProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  options: RhfMultiCheckboxOption[]
  /** Number of grid columns the options are laid out in. Defaults to `2`. */
  columns?: number
  className?: string
}

/**
 * React Hook Form–bound checkbox group — shadcn/Tailwind equivalent of the
 * old MUI `RHFMultiCheckbox`. Bound to a `string[]` field value; toggling an
 * option adds/removes its `value` from the array. Only the group as a whole
 * gets a `FormItem` — individual checkboxes are not wrapped in their own
 * `FormControl`/`FormItem`, they just share the group's description/message.
 */
export function RhfMultiCheckbox({
  name,
  label,
  description,
  required,
  options,
  columns = 2,
  className,
}: RhfMultiCheckboxProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: string[] = Array.isArray(field.value) ? field.value : []

        const toggle = (value: string) => {
          const next = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value]
          field.onChange(next)
        }

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {options.map((option) => {
                const optionId = `${name}-${option.value}`
                return (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={optionId}
                      checked={selected.includes(option.value)}
                      onCheckedChange={() => toggle(option.value)}
                      disabled={option.disabled}
                    />
                    <Label htmlFor={optionId} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                )
              })}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
