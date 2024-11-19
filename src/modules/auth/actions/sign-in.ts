'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { signIn } from '@/lib/auth'
import { SignInSchema } from '@/modules/auth/schemas'

export default async function SignIn(values: z.infer<typeof SignInSchema>) {
  const validatedFields = SignInSchema.safeParse(values)
  if (!validatedFields.success)
    return { error: 'Invalid email or password format!' }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })

    // Devuelve éxito si no hay errores
    return { success: 'Sign-in successful!' }
  } catch (error) {
    // Captura errores específicos o genéricos
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    // Error genérico
    console.error('Unexpected error in SignIn:', error)
    return { error: 'Unexpected server error.' }
  }
}
