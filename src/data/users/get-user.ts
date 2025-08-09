// Access database client
import { db } from '@/lib/orm/prisma-client'

// Fetch user by email
export const getUserByEmail = async (email: string) => {
  try {
    // Search by email
    const user = await db.user.findUnique({ where: { email } })
    // Return user if found
    return user
  } catch {
    return null
  }
}

// Fetch user by ID
export const getUserById = async (id: string) => {
  try {
    // Search by ID and include phone prefix
    const user = await db.user.findUnique({
      where: { id },
      include: { phonePrefix: true }
    })
    // Return user if found
    return user
  } catch {
    return null
  }
}
