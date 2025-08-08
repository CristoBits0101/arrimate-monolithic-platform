import { DefaultSession } from 'next-auth'

// Extend user.role to the Session type
declare module 'next-auth' {
  // Session data allowed
  interface Session {
    user: {
      customField: string
      id: string
      role: 'ADMIN' | 'USER'
      followers: number
      following: number
      posts: number
    } & DefaultSession['user']
  }
  // Roles allowed in users
  interface User {
    role: 'ADMIN' | 'USER'
    followers: number
    following: number
    posts: number
  }
}

// Extend role to the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'USER'
    followers?: number
    following?: number
    posts?: number
  }
}

declare module 'next-auth' {
  export type { AuthOptions as NextAuthOptions } from 'next-auth/core/types'
}
