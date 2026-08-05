import * as yup from "yup"

/**
 * Example Yup schema — this is the pattern every feature form should follow:
 * define the schema + inferred type here, then wire it up with
 * `@hookform/resolvers/yup` in the form component (see `demo-form.tsx`).
 */
export const demoFormSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
})

export type DemoFormValues = yup.InferType<typeof demoFormSchema>
