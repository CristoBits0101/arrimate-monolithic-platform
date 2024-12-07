'use server'

// Auth: To handle user sign-in
import { signIn } from '@/modules/auth/lib/auth'

// AuthError: To handle authentication-specific errors
import { AuthError } from 'next-auth'

// Data: Function to generate verification tokens
import { generateVerificationToken } from '@/modules/auth/data/tokens/token-generator'

// Data: Function to retrieve user by email
import { getUserByEmail } from '@/modules/auth/data/users/user-data'

// Mail: To send verification email
import { sendVerificationEmail } from '@/modules/auth/lib/resend'

// Schema: Validation schema for sign-in
import { BackendSignInSchema } from '@/modules/auth/schemas'

// Zod: To validate data in the backend
import * as z from 'zod'

// Receive input values and email message
export default async function signInAction(
  values: z.infer<typeof BackendSignInSchema>,
  emailMessage: string
) {
  /**
   * Validation
   *
   * 1. Validate input data
   * 2. Return an error object if validation fails
   */
  const validatedFields = BackendSignInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email or password format!' }
  }

  /**
   * Validation
   *
   * 1. Extract email and password
   * 2. Check if the user exists in the database
   * 3. Return an error object if the user does not exist
   */
  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' }
  }

  /**
   * Validation
   *
   * 1. Check if the user's email is verified
   * 2. Generate a verification token if not verified
   * 3. Send a verification email
   * 4. Return a success message indicating the email was sent
   */
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      emailMessage
    )

    return { success: 'Confirmation email sent!' }
  }

  /**
   * Authentication
   *
   * 1. Attempt to sign in the user with the provided credentials
   * 2. Return a success message if sign-in is successful
   * 3. Handle authentication-specific errors
   * 4. Return a generic error for unexpected issues
   */
  try {
    await signIn('credentials', { email, password, redirect: false })
    return { success: 'Sign-in successful!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    console.error('Unexpected error in SignIn:', error)
    return { error: 'Unexpected server error.' }
  }
}
