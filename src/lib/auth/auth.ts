// Import the database instance
import { db } from '@/lib/orm/prisma-client'

// Import user-related functions
import { getUserById } from '@/data/users/get-user'

// Import authentication configurations
import authConfig from '@/lib/auth/auth.config'
import NextAuth from 'next-auth'

// Import Prisma adapter for NextAuth
import { PrismaAdapter } from '@auth/prisma-adapter'

// Export authentication handlers and helpers
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Define custom pages for authentication flows
  pages: {
    // Custom sign-in page
    signIn: '/sign-in',
    // Page for authentication errors
    error: '/unauthorized-access',
    // Email verification request page
    verifyRequest: '/auth/verify-request',
    // Redirect page for new users
    newUser: '/'
  },
  // Define event handlers
  events: {
    // Event triggered when an account is linked
    async linkAccount({ user }) {
      // Mark the user's email as verified in the database
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  // Configure callbacks to control authentication behavior
  callbacks: {
    // Validate user and account before sign-in
    async signIn({ user, account }) {
      // Allow OAuth providers (e.g., Google, Apple) without email verification
      if (account?.provider !== 'credentials') return true

      // If using credentials, ensure the user exists and has a valid email
      if (!user.id) return false
      const existingUser = await getUserById(user.id)

      // Prevent sign-in if the user's email is not verified
      if (!existingUser?.emailVerified) return false

      // TODO: Implement additional checks (e.g., 2FA)

      // Allow sign-in if all checks pass
      return true
    },

    // Include user ID and role in the session object sent to the client
    async session({ token, session }) {
      // Attach user ID to the session
      if (token.sub && session.user) session.user.id = token.sub

      // Attach user role (e.g., ADMIN, USER) to the session
      if (token.role && session.user)
        session.user.role = token.role as 'ADMIN' | 'USER'

      // Attach user statistics to the session
      if (session.user) {
        if (typeof token.followers === 'number')
          session.user.followers = token.followers
        if (typeof token.following === 'number')
          session.user.following = token.following
        if (typeof token.posts === 'number') session.user.posts = token.posts
        if (token.createdAt) session.user.createdAt = token.createdAt as string
        if (token.prefix) session.user.prefix = token.prefix as string
      }

      // Return the updated session
      return session
    },

    // Include user role in the JWT token
    async jwt({ token }) {
      // Skip if the token has no user ID (sub)
      if (!token.sub) return token

      // Retrieve the user's data by ID
      const userId = token.sub
      const existingUser = await getUserById(userId)

      // Skip if the user does not exist
      if (!existingUser) return token

      // Add the user's role to the JWT token
      token.role = existingUser.role as 'ADMIN' | 'USER'

      // Add user statistics to the JWT token
      token.followers = existingUser.followers
      token.following = existingUser.following
      token.posts = existingUser.posts
      token.createdAt = existingUser.createdAt.toISOString()
      token.prefix = existingUser.phonePrefix?.prefix

      // Return the updated token
      return token
    }
  },
  // Configure Prisma adapter to handle database operations
  adapter: PrismaAdapter(db),

  // Use JWT strategy for session management
  session: { strategy: 'jwt' },

  // Merge additional authentication configurations
  ...authConfig
})
