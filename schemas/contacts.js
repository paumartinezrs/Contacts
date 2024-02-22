import z from 'zod'

const contactSchema = z.object({
   owner: z.number().positive(),
   contact: z.number().positive(),
   relation: z.string()
})

export function validateContact(input) {
    return contactSchema.safeParse(input)
}

export function validatePartialContact(input) {
    return contactSchema.partial().safeParse(input)
}