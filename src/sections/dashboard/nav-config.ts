import {
  ArrowLeftRightIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  ReceiptIcon,
  SparklesIcon,
  SquareChartGanttIcon,
  WalletIcon,
} from "lucide-react"

import type { DashboardNavItem } from "@/sections/dashboard/types"

/**
 * Sidebar nav items, in order — mirrors `dashboard.webp`. Only `dashboard`
 * and `neuro-ai` render real content (`overview-panel.tsx` /
 * `chat-panel.tsx`); the rest render a shared `PlaceholderPanel` so the nav
 * doesn't dead-end while those sections are still unbuilt.
 */
export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { key: "neuro-ai", label: "Neuro AI", icon: SparklesIcon },
  { key: "accounts", label: "Accounts", icon: WalletIcon },
  { key: "transactions", label: "Transactions", icon: ArrowLeftRightIcon },
  { key: "reports", label: "Reports", icon: SquareChartGanttIcon },
  { key: "investments", label: "Investments", icon: LineChartIcon },
  { key: "loans", label: "Loans", icon: LandmarkIcon },
  { key: "taxes", label: "Taxes", icon: ReceiptIcon },
]
