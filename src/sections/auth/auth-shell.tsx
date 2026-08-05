"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"

import { AnimatedWaveBackground } from "@/sections/animated-wave-background"
import { BrandLogo } from "@/sections/brand-logo"

export interface AuthShellProps {
  title: string
  description: string
  children: React.ReactNode
  /** Rendered under the card — e.g. "Don't have an account? Sign up". */
  footer?: React.ReactNode
}

/**
 * Shared full-screen shell for the auth screens (login/signup/forgot
 * password) — dark "neuro" skin with the ambient gradient glow from the
 * reference dashboard (`dashboard.webp`) behind a centered card.
 */
export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="neuro relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <div className="neuro-wave-container">
        <AnimatedWaveBackground />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-sm flex-col gap-6"
      >
        <Link href="/" className="flex justify-center">
          <BrandLogo className="text-lg" />
        </Link>

        <div className="neuro-surface flex flex-col gap-6 rounded-xl p-6 shadow-2xl shadow-black/40 transition-shadow sm:p-8">
          <div className="flex flex-col gap-1.5 text-center">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {children}
        </div>

        {footer && (
          <p className="text-center text-sm text-muted-foreground">
            {footer}
          </p>
        )}
      </motion.div>
    </div>
  )
}
