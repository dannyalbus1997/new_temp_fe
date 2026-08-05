"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { Switch } from "@/components/ui/switch"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfSwitchProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  /** Where the label renders relative to the switch. Defaults to `"end"`. */
  labelPlacement?: "start" | "end"
  className?: string
}

/**
 * React Hook Form–bound switch — shadcn/Tailwind equivalent of the old MUI
 * `CustomSwitch`. Bound to a boolean field value; `labelPlacement` reorders
 * the JSX (rather than using CSS `order`) to put the label before or after
 * the switch.
 */
export function RhfSwitch({
  name,
  label,
  description,
  required,
  disabled,
  labelPlacement = "end",
  className,
}: RhfSwitchProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const switchControl = (
          <FormControl>
            <Switch
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        )

        const labelNode = label && (
          <FormLabel className="font-normal">
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
        )

        return (
          <FormItem className={className}>
            <div className="flex items-center gap-2">
              {labelPlacement === "start" ? (
                <>
                  {labelNode}
                  {switchControl}
                </>
              ) : (
                <>
                  {switchControl}
                  {labelNode}
                </>
              )}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
