"use client"

import * as React from "react"
import { MotionConfig } from "motion/react"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from "@/lib/store"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {/*
           * `reducedMotion="user"` makes every `motion.*` animation
           * throughout the app automatically honor the OS-level
           * "prefers-reduced-motion" setting (cross-fades instead of
           * transforms, no infinite loops) with no per-component work.
           */}
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
