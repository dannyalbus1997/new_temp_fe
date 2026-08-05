import type { LucideIcon } from "lucide-react"

export interface DashboardNavItem {
  key: string
  label: string
  icon: LucideIcon
}

export interface ChatHistoryItem {
  key: string
  label: string
  active?: boolean
  /** Visually de-emphasized, matching the trailing faded item in the reference design. */
  muted?: boolean
}

export interface ChatHistoryGroup {
  heading: string
  items: ChatHistoryItem[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  /** Rendered below `content` for assistant messages that include a chart. */
  chart?: "comparison"
}

export interface DashboardNotification {
  id: string
  title: string
  time: string
  icon: LucideIcon
  read: boolean
}
