"use client"

import { motion, type Variants } from "motion/react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/sections/brand-logo"
import { DASHBOARD_NAV_ITEMS } from "@/sections/dashboard/nav-config"
import { WelcomeCard } from "@/sections/dashboard/welcome-card"

export interface DashboardSidebarProps {
  activeKey: string
  onSelect: (key: string) => void
  className?: string
}

const navContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
}

/**
 * Left navigation rail — logo, greeting card, nav list, and the "Activate
 * Pro" upsell card, matching `dashboard.webp`. Deliberately left
 * unstyled/transparent against the shared `.neuro` background (only the
 * chat-history and chat/overview panels are elevated `neuro-surface` cards),
 * matching the reference layout.
 *
 * The active nav item is highlighted by a `motion.div` sharing
 * `layoutId="active-nav-pill"` across renders — `motion` automatically
 * FLIP-animates it between whichever button currently renders it, which is
 * far more robust than measuring `getBoundingClientRect()` by hand (that
 * approach could sample a button's position mid-entrance-animation and
 * misplace the indicator).
 */
export function DashboardSidebar({
  activeKey,
  onSelect,
  className,
}: DashboardSidebarProps) {
  return (
    <aside className={cn("flex w-64 shrink-0 flex-col gap-6", className)}>
      <BrandLogo className="text-base" />

      <WelcomeCard name="George" className="neuro-surface rounded-xl p-4" />

      <motion.nav
        initial="hidden"
        animate="show"
        variants={navContainerVariants}
        className="flex flex-1 flex-col gap-1"
      >
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey
          const Icon = item.icon
          return (
            <motion.button
              key={item.key}
              type="button"
              variants={navItemVariants}
              onClick={() => onSelect(item.key)}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-lg bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <Icon className="relative z-10 size-4" />
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          )
        })}
      </motion.nav>

      <div className="neuro-brand-gradient neuro-brand-gradient-animated flex flex-col gap-2 rounded-xl p-4 text-white">
        <SparklesIcon className="size-5" />
        <p className="text-sm font-semibold">Activate NeuroBank Pro</p>
        <p className="text-xs text-white/80">Elevate finances with AI</p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-1 w-fit bg-white text-foreground transition-transform hover:scale-105 hover:bg-white/90 active:scale-95"
        >
          Upgrade
        </Button>
      </div>
    </aside>
  )
}
