"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { AnimatedWaveBackground } from "@/sections/animated-wave-background"
import { ChatHistoryPanel } from "@/sections/dashboard/chat-history-panel"
import { ChatPanel } from "@/sections/dashboard/chat-panel"
import { DASHBOARD_NAV_ITEMS } from "@/sections/dashboard/nav-config"
import { OverviewPanel } from "@/sections/dashboard/overview-panel"
import { PlaceholderPanel } from "@/sections/dashboard/placeholder-panel"
import { DashboardSidebar } from "@/sections/dashboard/sidebar"

/**
 * Admin panel entry point, rendered by `src/app/dashboard/page.tsx`.
 * Defaults to the "Neuro AI" tab so it reproduces `dashboard.webp` as-is;
 * "Dashboard" shows a stats/table overview, and the remaining nav items
 * show a shared placeholder until those sections are built out.
 */
export function DashboardSection() {
  const [activeKey, setActiveKey] = React.useState("neuro-ai")
  const activeNavItem = DASHBOARD_NAV_ITEMS.find((item) => item.key === activeKey)

  return (
    <div className="neuro relative flex min-h-screen gap-4 overflow-hidden p-4 lg:p-6">
      <div className="neuro-wave-container">
        <AnimatedWaveBackground />
      </div>

      <DashboardSidebar
        activeKey={activeKey}
        onSelect={setActiveKey}
        className="relative z-10"
      />

      {/*
       * `mode="wait"` so the outgoing tab finishes its exit animation
       * before the incoming one mounts — a real crossfade, not just an
       * enter-only animation on remount.
       */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex min-w-0 flex-1 gap-4"
        >
          {activeKey === "neuro-ai" && (
            <>
              <ChatHistoryPanel />
              <ChatPanel />
            </>
          )}
          {activeKey === "dashboard" && <OverviewPanel />}
          {activeKey !== "neuro-ai" && activeKey !== "dashboard" && activeNavItem && (
            <PlaceholderPanel item={activeNavItem} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
