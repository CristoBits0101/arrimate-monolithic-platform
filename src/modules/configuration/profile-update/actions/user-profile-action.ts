'use server'

// Auth
import { auth } from '@/lib/auth/auth'

// Database
import { db } from '@/lib/orm/prisma-client'

// Utils
import { BackendProfileSchema } from '@/modules/configuration/profile-update/schemas'
import { getUserById } from '@/data/users/get-user'
import bcrypt from 'bcryptjs'

export default async function profileAction(values: Record<string, any>) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }
  const filteredValues = Object.fromEntries(
    Object.entries(values)
      .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
      .filter(([, v]) => v !== '' && v !== undefined && v !== null)
  )

  const parsed = BackendProfileSchema.safeParse(filteredValues)
  if (!parsed.success) {
    return { error: 'Invalid fields' }
  }

  const data = parsed.data
  try {
    const user = await getUserById(session.user.id)
    if (!user) {
      return { error: 'User not found' }
    }

    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.nickname) updateData.nickname = data.nickname
    if (data.birthdate) updateData.birthdate = new Date(data.birthdate)
    if (data.zipCode) updateData.zipCode = data.zipCode
    if (data.country) updateData.country = data.country
    if (data.city) updateData.city = data.city
    if (data.address) updateData.address = data.address
    if (data.occupation) updateData.occupation = data.occupation
    if (data.interests) updateData.interests = data.interests
    if (data.slogan) updateData.slogan = data.slogan
    if (data.portfolio) updateData.portfolioUrl = data.portfolio
    if (data.phoneNumber) updateData.phoneNumber = data.phoneNumber
    if (data.email) updateData.email = data.email

    if (data.gender) {
      const gender = await db.genders.findFirst({
        where: { name: data.gender }
      })
      if (gender) updateData.genderId = gender.id
    }

    if (data.phonePrefix) {
      const prefix = await db.phonePrefix.findUnique({
        where: { prefix: data.phonePrefix }
      })
      if (prefix) updateData.phonePrefixId = prefix.id
    }

    if (data.newPassword) {
      if (!user.password) {
        return { error: 'OAuth accounts cannot change password' }
      }
      if (!data.password) {
        return { error: 'Current password required' }
      }
      const validPassword = await bcrypt.compare(data.password, user.password)
      if (!validPassword) {
        return { error: 'Incorrect password' }
      }
      updateData.password = await bcrypt.hash(data.newPassword, 10)
    }

    await db.user.update({
      where: { id: user.id },
      data: updateData
    })

    return { success: 'Profile updated' }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { error: 'Update failed' }
  }
}

