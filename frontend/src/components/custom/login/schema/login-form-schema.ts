import z from 'zod';
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
