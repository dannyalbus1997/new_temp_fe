"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfTelDialCode {
  /** ISO2 country code. */
  code: string
  /** Country display name. */
  label: string
  /** e.g. `"+44"` */
  dialCode: string
}

/**
 * Small hardcoded set of common dial codes. Not exhaustive/authoritative —
 * good enough for a dependency-free country picker.
 */
export const DEFAULT_DIAL_CODES: RhfTelDialCode[] = [
  { code: "GB", label: "United Kingdom", dialCode: "+44" },
  { code: "US", label: "United States", dialCode: "+1" },
  { code: "CA", label: "Canada", dialCode: "+1" },
  { code: "IE", label: "Ireland", dialCode: "+353" },
  { code: "AU", label: "Australia", dialCode: "+61" },
  { code: "IN", label: "India", dialCode: "+91" },
  { code: "PK", label: "Pakistan", dialCode: "+92" },
  { code: "DE", label: "Germany", dialCode: "+49" },
  { code: "FR", label: "France", dialCode: "+33" },
  { code: "ES", label: "Spain", dialCode: "+34" },
  { code: "IT", label: "Italy", dialCode: "+39" },
  { code: "NL", label: "Netherlands", dialCode: "+31" },
  { code: "AE", label: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", label: "Saudi Arabia", dialCode: "+966" },
  { code: "CN", label: "China", dialCode: "+86" },
  { code: "JP", label: "Japan", dialCode: "+81" },
  { code: "SG", label: "Singapore", dialCode: "+65" },
  { code: "ZA", label: "South Africa", dialCode: "+27" },
  { code: "NG", label: "Nigeria", dialCode: "+234" },
  { code: "BR", label: "Brazil", dialCode: "+55" },
]

export interface RhfTelInputProps {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  disabled?: boolean
  /** Dial code preselected when the field has no value yet. Defaults to `"+44"`. */
  defaultDialCode?: string
  className?: string
}

/**
 * React Hook Form–bound phone input — shadcn/Tailwind equivalent of the old
 * MUI `RHFTelInput`. Deliberately dependency-free: no `react-phone-input-2`
 * or `libphonenumber-js`. The field value is stored as a single string
 * (`` `${dialCode} ${nationalNumber}`.trim() ``); the dial code and national
 * number are derived back out of it on render via a naive `split(" ")` —
 * the first token is treated as the dial code when it starts with `"+"`,
 * otherwise the whole string is treated as the national number and the
 * default dial code is used. Precise a11y wiring is nice-to-have here, so
 * `id`/`aria-invalid` land on the outer `InputGroup` rather than the inner
 * `<input>`.
 */
export function RhfTelInput({
  name,
  label,
  description,
  required,
  disabled,
  defaultDialCode = "+44",
  className,
}: RhfTelInputProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const rawValue: string = field.value ?? ""
        const [firstToken, ...rest] = rawValue.split(" ")
        const hasDialCode = Boolean(firstToken?.startsWith("+"))
        const dialCode = hasDialCode ? firstToken : defaultDialCode
        const nationalNumber = hasDialCode ? rest.join(" ") : rawValue

        const setValue = (nextDialCode: string, nextNumber: string) => {
          field.onChange(`${nextDialCode} ${nextNumber}`.trim())
        }

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}
            <FormControl>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Select
                    value={dialCode}
                    onValueChange={(nextDialCode) =>
                      setValue(nextDialCode ?? defaultDialCode, nationalNumber)
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger
                      size="sm"
                      className="h-6 min-w-[4.5rem] gap-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_DIAL_CODES.map((country) => (
                        <SelectItem key={country.code} value={country.dialCode}>
                          {country.dialCode} {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </InputGroupAddon>
                <InputGroupInput
                  type="tel"
                  inputMode="tel"
                  disabled={disabled}
                  value={nationalNumber}
                  onChange={(e) => setValue(dialCode, e.target.value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </InputGroup>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
