"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { toggleSidebar } from "@/lib/store/ui-slice"
import { demoFormSchema, type DemoFormValues } from "@/features/demo/schema"

/**
 * Demo form showing the intended pattern: React Hook Form + Yup validation
 * (via `@hookform/resolvers/yup`) driving the shared shadcn `Form`
 * primitives, plus a Redux Toolkit slice (`ui`) read/dispatched through the
 * typed hooks — the `sidebarOpen` flag is persisted (see `lib/store/index.ts`)
 * so it survives a page reload.
 */
export function DemoForm() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  const form = useForm<DemoFormValues>({
    resolver: yupResolver(demoFormSchema),
    defaultValues: { name: "", email: "" },
  })

  function onSubmit(values: DemoFormValues) {
    toast.success(`Saved ${values.name} <${values.email}>`)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ada Lovelace" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ada@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(toggleSidebar())}
            >
              Redux: sidebar is {sidebarOpen ? "open" : "closed"} (toggle)
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
