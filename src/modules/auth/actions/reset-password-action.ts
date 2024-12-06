'use server'

import * as z from 'zod'
import { generateTokenResetPassword } from '@/modules/auth/data/tokens/token-generator'
import { getUserByEmail } from '@/modules/auth/data/users/user-data'
import { ResetPasswordSchema } from '@/modules/auth/schemas'
import { sendPasswordResetEmail } from '@/modules/auth/lib/resend'

const resetPasswordSchema = async (
  values: z.infer<typeof ResetPasswordSchema>,
  emailMessage: string
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  // Check if the email is valid
  if (!validatedFields.success) return { error: 'Invalid email!' }

  // Extract fields
  const { email } = validatedFields.data

  // Retrieve the user by email
  const existingUser = await getUserByEmail(email)

  // Check if the user exists
  if (!existingUser) return { error: 'Email not found!' }

  //
  const resetPasswordToken = await generateTokenResetPassword(email)

  //
  await sendPasswordResetEmail(
    resetPasswordToken.email,
    resetPasswordToken.token,
    emailMessage
  )

  return { success: 'Reset email sent!' }
}

export default resetPasswordSchema
