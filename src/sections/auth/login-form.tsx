"use client"

import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RhfCheckbox, RhfFormProvider, RhfTextField } from "@/components/rhf"
import { loginSchema, type LoginFormValues } from "@/sections/auth/schema"

/**
 * Login screen form. Standalone/mocked for now — wire `onSubmit` up to a
 * real auth mutation (RTK Query) once one exists.
 */
export function LoginForm() {
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })

  function onSubmit(values: LoginFormValues) {
    toast.success(`Welcome back, ${values.email}`)
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
      <RhfTextField
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
      />

      <div className="flex items-center justify-between">
        <RhfCheckbox name="rememberMe" label="Remember me" />
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={methods.formState.isSubmitting}
        className="neuro-brand-gradient border-0 text-white transition-transform hover:scale-[1.02] active:scale-[0.97]"
      >
        Sign in
      </Button>
    </RhfFormProvider>
  )
}
