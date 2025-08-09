'use server'

// Prisma
import { db } from '@/lib/orm/prisma-client'

/**
 * Search phone prefixes matching the provided query.
 * Removes duplicates and sorts the results numerically.
 */
export async function getPhonePrefixes(query: string) {
  try {
    const prefixes = await db.phonePrefix.findMany({
      where: {
        prefix: {
          contains: query,
          mode: 'insensitive'
        }
      },
      select: {
        prefix: true
      },
      distinct: ['prefix']
    })

    return prefixes
      .map((p) => p.prefix)
      .sort(
        (a, b) =>
          parseInt(a.replace(/\D/g, ''), 10) -
          parseInt(b.replace(/\D/g, ''), 10)
      )
  } catch (error) {
    console.error('Error fetching phone prefixes:', error)
    throw error
  }
}
