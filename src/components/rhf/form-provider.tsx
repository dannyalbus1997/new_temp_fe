"use client"

import * as React from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface RhfFormProviderProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  methods: UseFormReturn<TFieldValues>
  onSubmit?: React.SubmitEventHandler<HTMLFormElement>
  children: React.ReactNode
}

/**
 * Thin convenience wrapper around the shared shadcn `Form` primitive
 * (see `@/components/ui/form`) — mirrors the old MUI `<FormProvider methods={...}>`
 * shape so feature forms only need to wire `useForm()` + a submit handler:
 *
 * ```tsx
 * const methods = useForm({ resolver: yupResolver(schema) })
 * <RhfFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
 *   <RhfTextField name="email" label="Email" />
 * </RhfFormProvider>
 * ```
 *
 * For full control over layout (e.g. custom `FormItem`/`FormLabel` composition)
 * use `Form` + `FormField` from `@/components/ui/form` directly instead.
 */
export function RhfFormProvider<TFieldValues extends FieldValues>({
  methods,
  onSubmit,
  children,
  className,
  ...props
}: RhfFormProviderProps<TFieldValues>) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        {children}
      </form>
    </Form>
  )
}
