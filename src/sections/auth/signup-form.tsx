"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MailIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RhfCheckbox, RhfFormProvider, RhfTextField } from "@/components/rhf"
import { signupSchema, type SignupFormValues } from "@/sections/auth/schema"

/**
 * Signup screen form. Standalone/mocked for now — wire `onSubmit` up to a
 * real auth mutation (RTK Query) once one exists.
 */
export function SignupForm() {
  const methods = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  })

  function onSubmit(values: SignupFormValues) {
    toast.success(`Account created for ${values.name}`)
  }

  return (
    <RhfFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RhfTextField
        name="name"
        label="Full name"
        placeholder="Ada Lovelace"
        startIcon={<UserIcon />}
        required
      />
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
      <RhfTextField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="••••••••"
        required
      />

      <RhfCheckbox
        name="agreeToTerms"
        label="I agree to the Terms of Service and Privacy Policy"
        required
      />

      <Button
        type="submit"
        disabled={methods.formState.isSubmitting}
        className="neuro-brand-gradient border-0 text-white transition-transform hover:scale-[1.02] active:scale-[0.97]"
      >
        Create account
      </Button>
    </RhfFormProvider>
  )
}
