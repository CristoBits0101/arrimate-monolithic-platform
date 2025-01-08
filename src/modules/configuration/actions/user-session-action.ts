'use server'

import { auth } from '@/lib/auth/auth'

export default async function getUserSessionAction() {
  try {
    const session = await auth()
    return session || null
  } catch (error) {
    console.error('Error obteniendo la sesión:', error)
    return null
  }
}
