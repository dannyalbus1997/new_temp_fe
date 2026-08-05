"use client"

import * as React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { CheckCircle2Icon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RhfFormProvider, RhfTextField } from "@/components/rhf"
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/sections/auth/schema"

/**
 * Forgot-password screen form. Standalone/mocked for now — wire `onSubmit`
 * up to a real "send reset link" mutation (RTK Query) once one exists.
 */
export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = React.useState<string | null>(null)

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  function onSubmit(values: ForgotPasswordFormValues) {
    setSentTo(values.email)
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2Icon className="size-10 text-primary" />
        <p className="text-sm text-muted-foreground">
          If an account exists for <span className="font-medium text-foreground">{sentTo}</span>,
          a password reset link is on its way.
        </p>
        <Button
          variant="outline"
          className="mt-2 w-full"
          onClick={() => setSentTo(null)}
        >
          Use a different email
        </Button>
      </div>
    )
  }

  return (
    <RhfFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RhfTextField
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        startIcon={<MailIcon />}
        required
      />

      <Button
        type="submit"
        disabled={methods.formState.isSubmitting}
        className="neuro-brand-gradient border-0 text-white transition-transform hover:scale-[1.02] active:scale-[0.97]"
      >
        Send reset link
      </Button>
    </RhfFormProvider>
  )
}
