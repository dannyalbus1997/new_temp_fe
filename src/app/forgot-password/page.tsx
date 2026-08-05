import Link from "next/link"

import { AuthShell } from "@/sections/auth/auth-shell"
import { ForgotPasswordForm } from "@/sections/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      description="Enter the email associated with your account and we'll send you a reset link."
      footer={
        <>
          Remembered your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
