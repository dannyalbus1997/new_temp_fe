import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  PiggyBankIcon,
  TrendingUpIcon,
} from "lucide-react"

import type {
  ChatHistoryGroup,
  ChatMessage,
  DashboardNotification,
} from "@/sections/dashboard/types"

/** Static demo content standing in for real chat history until a backend exists. */
export const CHAT_HISTORY: ChatHistoryGroup[] = [
  {
    heading: "Today",
    items: [{ key: "year-income", label: "Year Income", active: true }],
  },
  {
    heading: "Yesterday",
    items: [
      { key: "monthly-budget", label: "Monthly Budget" },
      { key: "cash-flow-forecast", label: "Cash Flow Forecast" },
      { key: "smart-saving-tips", label: "Smart Saving Tips" },
      { key: "expense-alert", label: "Expense Alert" },
    ],
  },
  {
    heading: "Last 7 days",
    items: [
      { key: "spending-report", label: "Spending Report" },
      { key: "investment-ai", label: "Investment AI" },
      { key: "overdraft-warning", label: "Overdraft Warning" },
      { key: "subs-audit", label: "Subs Audit" },
      { key: "budget-plan", label: "Budget Plan", muted: true },
    ],
  },
]

/** Static demo conversation standing in for a real Neuro AI backend. */
export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Can you compare this with this year's data?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Here's a comparison of your income from January to March this year versus the same period last year. As you can see, your income has increased by 12% this year. The chart highlights the monthly comparison for both years, showing the differences in your income.",
    chart: "comparison",
  },
]

/** Pre-filled composer draft, matching the reference screenshot. */
export const CHAT_DRAFT =
  "Can you show me a breakdown of my income sources for this year? A table or chart would be great."

/** Twelve monthly points for the small overview chart in the chat header. */
export const YEAR_OVERVIEW_SERIES = [
  220, 260, 300, 520, 640, 610, 700, 980, 860, 760, 840, 920,
]
export const YEAR_OVERVIEW_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

/** Current vs. last year income series for the big comparison chart. */
export const INCOME_COMPARISON_LABELS = ["January", "February", "March"]
export const INCOME_COMPARISON_CURRENT_YEAR = [
  1200, 1400, 1900, 2600, 3100, 2900, 3400, 4600, 4300, 4700, 3900, 4400, 4900,
]
export const INCOME_COMPARISON_LAST_YEAR = [
  900, 1000, 1100, 1300, 1500, 1650, 1700, 1750, 1800, 1900, 2000, 2100, 2200,
]

export interface DashboardStat {
  label: string
  value: string
  delta: string
  trend: "up" | "down"
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "Total Balance", value: "$48,290.00", delta: "+8.2%", trend: "up" },
  { label: "Monthly Income", value: "$6,420.00", delta: "+12.0%", trend: "up" },
  { label: "Monthly Expenses", value: "$3,180.00", delta: "-4.1%", trend: "down" },
  { label: "Savings Rate", value: "34%", delta: "+2.5%", trend: "up" },
]

/** Static demo notifications standing in for a real notifications feed. */
export const NOTIFICATIONS: DashboardNotification[] = [
  {
    id: "1",
    title: "Your income increased 12% compared to last year",
    time: "2 minutes ago",
    icon: TrendingUpIcon,
    read: false,
  },
  {
    id: "2",
    title: "Large transaction detected: Apple Store, $1,299.00",
    time: "1 hour ago",
    icon: AlertTriangleIcon,
    read: false,
  },
  {
    id: "3",
    title: "You're on track to hit your savings goal this month",
    time: "5 hours ago",
    icon: PiggyBankIcon,
    read: false,
  },
  {
    id: "4",
    title: "Payroll deposit of $4,900.00 received",
    time: "Yesterday",
    icon: ArrowLeftRightIcon,
    read: true,
  },
]

export interface DashboardTransaction {
  id: string
  merchant: string
  category: string
  date: string
  amount: string
  status: "Completed" | "Pending"
}

export const DASHBOARD_TRANSACTIONS: DashboardTransaction[] = [
  { id: "1", merchant: "Apple Store", category: "Shopping", date: "Mar 24, 2025", amount: "-$1,299.00", status: "Completed" },
  { id: "2", merchant: "Payroll Deposit", category: "Income", date: "Mar 22, 2025", amount: "+$4,900.00", status: "Completed" },
  { id: "3", merchant: "Whole Foods", category: "Groceries", date: "Mar 21, 2025", amount: "-$186.42", status: "Completed" },
  { id: "4", merchant: "Netflix", category: "Subscription", date: "Mar 20, 2025", amount: "-$15.99", status: "Pending" },
  { id: "5", merchant: "Uber", category: "Transport", date: "Mar 19, 2025", amount: "-$32.10", status: "Completed" },
]
