import * as yup from "yup"

/**
 * Yup schemas for the auth screens (`login-form.tsx`, `signup-form.tsx`,
 * `forgot-password-form.tsx`) — same pattern as
 * `src/features/demo/schema.ts`: schema + inferred type here, wired up with
 * `@hookform/resolvers/yup` in the form component.
 */

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: yup.boolean().default(false),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export const signupSchema = yup.object({
  name: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms to continue")
    .required(),
})

export type SignupFormValues = yup.InferType<typeof signupSchema>

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
})

export type ForgotPasswordFormValues = yup.InferType<
  typeof forgotPasswordSchema
>
