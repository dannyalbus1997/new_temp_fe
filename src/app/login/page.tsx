import Link from "next/link"

import { AuthShell } from "@/sections/auth/auth-shell"
import { LoginForm } from "@/sections/auth/login-form"

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your NeuroBank account to continue."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
