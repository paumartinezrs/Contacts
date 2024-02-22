import z from 'zod'

const userSchema = z.object({
    number: z.number().positive(),
    name: z.string(),
    surname: z.string(),
    email: z.string().email()
})

export function validateUser(input) {
    return userSchema.safeParse(input)
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input)
}
