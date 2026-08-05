"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type RhfSelectOption = string | { label: React.ReactNode; value: string }
export interface RhfSelectOptionGroup {
  label: string
  options: RhfSelectOption[]
}

export interface RhfSelectProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  placeholder?: string
  /** Flat option list. Ignored when `groupedOptions` is set. */
  options?: RhfSelectOption[]
  /** Options rendered under labelled `SelectGroup`s — takes precedence over `options`. */
  groupedOptions?: RhfSelectOptionGroup[]
  className?: string
  triggerClassName?: string
}

function normalizeOption(option: RhfSelectOption) {
  return typeof option === "string"
    ? { value: option, label: option }
    : option
}

/**
 * React Hook Form–bound single select — shadcn/Tailwind equivalent of the old
 * MUI `RHFSelect`. Renders a native-feeling dropdown (Base UI `Select`) driven
 * by `field.value` / `field.onChange`.
 */
export function RhfSelect({
  name,
  label,
  description,
  required,
  disabled,
  placeholder = "Select an option",
  options = [],
  groupedOptions,
  className,
  triggerClassName,
}: RhfSelectProps) {
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
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={triggerClassName ?? "w-full"}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {groupedOptions
                ? groupedOptions.map((group) => (
                    <SelectGroup key={group.label}>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.options.map((option) => {
                        const { value, label: optLabel } = normalizeOption(option)
                        return (
                          <SelectItem key={value} value={value}>
                            {optLabel}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  ))
                : options.map((option) => {
                    const { value, label: optLabel } = normalizeOption(option)
                    return (
                      <SelectItem key={value} value={value}>
                        {optLabel}
                      </SelectItem>
                    )
                  })}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
