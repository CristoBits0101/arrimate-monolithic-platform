'use server'

// Prisma
import { db } from '@/lib/orm/prisma-client'

export async function getPhonePrefixes() {
  
  try {
    const prefixes = await db.phonePrefix.findMany({
      select: {
        prefix: true
      }
    })
    // Remove duplicates and sort by prefix number
    const uniquePrefixes = new Set(prefixes.map((p) => p.prefix))
    /**
     * Convert Set
     * Sort by prefix number
     */
    return Array.from(uniquePrefixes).sort((a, b) => {
      /**
       * Remove non-numeric characters
       * Convert to integer
       * Compare prefix numbers
       */
      return (
        parseInt(a.replace(/\D/g, ''), 10) - parseInt(b.replace(/\D/g, ''), 10)
      )
    })
  } catch (error) {
    console.error('Error fetching phone prefixes:', error)
    throw error
  }
}
