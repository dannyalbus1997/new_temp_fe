"use client"

import type { ColumnDef } from "@tanstack/react-table"

export interface DemoRow {
  id: string
  name: string
  email: string
  role: "Admin" | "Member" | "Viewer"
}

export const demoData: DemoRow[] = [
  { id: "1", name: "Ava Thompson", email: "ava@example.com", role: "Admin" },
  { id: "2", name: "Liam Chen", email: "liam@example.com", role: "Member" },
  { id: "3", name: "Noor Haddad", email: "noor@example.com", role: "Viewer" },
]

/**
 * Column definitions live next to their feature (not in the generic
 * DataTable component) — see `src/components/data-table/data-table.tsx`
 * for the reusable table itself.
 */
export const demoColumns: ColumnDef<DemoRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
]
