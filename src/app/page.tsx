import { DataTable } from "@/components/data-table/data-table"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { demoColumns, demoData } from "@/features/demo/columns"
import { DemoForm } from "@/features/demo/demo-form"

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">project-1</h1>
          <p className="text-sm text-muted-foreground">
            Next.js · Tailwind · shadcn/ui · Redux Toolkit + RTK Query ·
            redux-persist · TanStack Table · RHF + Yup
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Form (React Hook Form + Yup)</CardTitle>
          <CardDescription>
            Validated with a Yup schema, wired through the shared shadcn form
            primitives. Also toggles a persisted Redux slice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DemoForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Table (TanStack Table)</CardTitle>
          <CardDescription>
            Generic <code>DataTable</code> wrapper — swap in RTK Query data
            per feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={demoColumns} data={demoData} />
        </CardContent>
      </Card>
    </div>
  )
}
