'use server'

// Prisma
import { db } from '@/lib/orm/prisma-client'

export async function getGenders() {
  try {
    // Fetch all genders from the database
    const genders = await db.genders.findMany({
      select: {
        id: true,
        name: true
      }
    })
    // Sort genders
    return genders.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error fetching genders:', error)
    throw error
  }
}
