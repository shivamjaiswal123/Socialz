import { z } from 'zod'

export const SignupSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters long"
    })
})
export const SigninSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})