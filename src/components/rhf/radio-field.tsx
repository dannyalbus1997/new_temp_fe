"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfRadioGroupOption {
  label: React.ReactNode
  value: string
  description?: React.ReactNode
}

export interface RhfRadioGroupProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  /** `true` (default) lays options out horizontally, `false` stacks them vertically. */
  row?: boolean
  options: RhfRadioGroupOption[]
  className?: string
}

/**
 * React Hook Form–bound radio group — shadcn/Tailwind equivalent of the old
 * MUI `RHFRadioGroup`. Only the `RadioGroup` root itself is wrapped in
 * `FormControl` (it renders the actual group container), while each option's
 * `RadioGroupItem` + `Label` pair is rendered as a sibling row.
 */
export function RhfRadioGroup({
  name,
  label,
  description,
  required,
  disabled,
  row = true,
  options,
  className,
}: RhfRadioGroupProps) {
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
            <RadioGroup
              value={field.value != null ? String(field.value) : ""}
              onValueChange={field.onChange}
              disabled={disabled}
              className={cn(
                row ? "flex flex-row flex-wrap gap-4" : "flex flex-col gap-2"
              )}
            >
              {options.map((option) => {
                const optionId = `${name}-${option.value}`
                return (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={optionId} />
                    <Label htmlFor={optionId} className="font-normal">
                      {option.label}
                    </Label>
                    {option.description && (
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </div>
                )
              })}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export interface RhfRadioButtonProps {
  name: string
  label?: React.ReactNode
  disabled?: boolean
  required?: boolean
  className?: string
}

const RADIO_BUTTON_CHECKED_VALUE = "checked"

/**
 * React Hook Form–bound standalone radio circle — shadcn/Tailwind equivalent
 * of the old MUI `RHFRadioButton`. Toggles a boolean field value; since Base
 * UI's radio primitives are built for grouped selection, this is implemented
 * as a `RadioGroup` with a single `RadioGroupItem` bound to a sentinel value.
 */
export function RhfRadioButton({
  name,
  label,
  disabled,
  required,
  className,
}: RhfRadioButtonProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const optionId = `${name}-${RADIO_BUTTON_CHECKED_VALUE}`
        return (
          <FormItem className={className}>
            <div className="flex items-center gap-2">
              <FormControl>
                <RadioGroup
                  value={field.value ? RADIO_BUTTON_CHECKED_VALUE : ""}
                  onValueChange={(value) =>
                    field.onChange(value === RADIO_BUTTON_CHECKED_VALUE)
                  }
                  disabled={disabled}
                >
                  <RadioGroupItem value={RADIO_BUTTON_CHECKED_VALUE} id={optionId} />
                </RadioGroup>
              </FormControl>
              {label && (
                <Label htmlFor={optionId} className="font-normal">
                  {label}
                  {required && <span className="text-destructive"> *</span>}
                </Label>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
