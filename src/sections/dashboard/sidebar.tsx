"use client"

import * as React from "react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { SparklesIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/sections/brand-logo"
import { DASHBOARD_NAV_ITEMS } from "@/sections/dashboard/nav-config"
import { WelcomeCard } from "@/sections/dashboard/welcome-card"

export interface DashboardSidebarProps {
  activeKey: string
  onSelect: (key: string) => void
  className?: string
  /**
   * Below `lg` the sidebar becomes an off-canvas drawer instead of a static
   * column — `open`/`onClose` control that drawer. Ignored at `lg` and up,
   * where the sidebar is always visible inline.
   */
  open?: boolean
  onClose?: () => void
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
  open = false,
  onClose,
}: DashboardSidebarProps) {
  // Escape closes the mobile drawer — the backdrop click covers the mouse
  // case, this covers keyboard users who tabbed into the drawer.
  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  const content = (
    <>
      <div className="flex items-center justify-between">
        <BrandLogo className="text-base" />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close navigation"
          onClick={onClose}
          className="lg:hidden"
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      <WelcomeCard name="George" className="neuro-surface rounded-xl p-4" />

      <motion.nav
        initial="hidden"
        animate="show"
        variants={navContainerVariants}
        className="flex flex-1 flex-col gap-1"
        aria-label="Dashboard sections"
      >
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey
          const Icon = item.icon
          return (
            <motion.button
              key={item.key}
              type="button"
              variants={navItemVariants}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                onSelect(item.key)
                onClose?.()
              }}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
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
              <Icon className="relative z-10 size-4" aria-hidden="true" />
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          )
        })}
      </motion.nav>

      <div className="neuro-brand-gradient neuro-brand-gradient-animated flex flex-col gap-2 rounded-xl p-4 text-white">
        <SparklesIcon className="size-5" aria-hidden="true" />
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
    </>
  )

  return (
    <>
      {/* Static column at `lg`+ — the drawer transform/overlay below never applies here. */}
      <aside
        className={cn(
          "hidden w-64 shrink-0 flex-col gap-6 lg:flex",
          className
        )}
      >
        {content}
      </aside>

      {/* Off-canvas drawer below `lg`. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 38 }}
              role="dialog"
              aria-modal="true"
              aria-label="Dashboard navigation"
              className="neuro fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-72 flex-col gap-6 overflow-y-auto bg-sidebar p-4 shadow-2xl lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
