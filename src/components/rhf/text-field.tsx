"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export interface RhfTextFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "name" | "defaultValue"> {
  name: string
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  /** Rendered inline before the input (e.g. a currency symbol or icon). */
  startIcon?: React.ReactNode
  /** Rendered inline after the input. Ignored for `type="password"` — that slot is
   * reserved for the built-in show/hide toggle. */
  endIcon?: React.ReactNode
  containerClassName?: string
}

/**
 * React Hook Form–bound text input — the shadcn/Tailwind equivalent of the
 * old MUI `RHFTextField`. Reads `control` off context, so it must be rendered
 * inside a `<Form {...methods}>` (see `RhfFormProvider`).
 */
export function RhfTextField({
  name,
  label,
  description,
  required,
  startIcon,
  endIcon,
  type = "text",
  containerClassName,
  className,
  ...props
}: RhfTextFieldProps) {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = type === "password"
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}
          <div className="relative flex items-center">
            {startIcon && (
              <span className="pointer-events-none absolute left-2.5 flex items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
                {startIcon}
              </span>
            )}
            <FormControl>
              <Input
                {...field}
                {...props}
                value={field.value ?? ""}
                type={resolvedType}
                className={cn(startIcon && "pl-8", (isPassword || endIcon) && "pr-8", className)}
              />
            </FormControl>
            {isPassword ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                tabIndex={-1}
                className="absolute right-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            ) : (
              endIcon && (
                <span className="absolute right-2.5 flex items-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
                  {endIcon}
                </span>
              )
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
