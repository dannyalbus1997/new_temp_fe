import Link from "next/link"

import { AuthShell } from "@/sections/auth/auth-shell"
import { SignupForm } from "@/sections/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start managing your finances with NeuroBank AI."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  )
}
