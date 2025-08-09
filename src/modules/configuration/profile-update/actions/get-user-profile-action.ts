'use server'

// Auth
import { auth } from '@/lib/auth/auth'

// Database
import { db } from '@/lib/orm/prisma-client'

export default async function getUserProfileAction () {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        gender: true,
        phonePrefix: true
      }
    })

    if (!user) return null

    return {
      name: user.name || '',
      nickname: user.nickname || '',
      gender: user.gender?.name || '',
      birthdate: user.birthdate
        ? user.birthdate.toISOString().split('T')[0]
        : '',
      phonePrefix: user.phonePrefix?.prefix || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
      zipCode: user.zipCode || '',
      country: user.country || '',
      city: user.city || '',
      address: user.address || '',
      occupation: user.occupation || '',
      interests: user.interests || '',
      slogan: user.slogan || '',
      portfolio: user.portfolioUrl || ''
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

