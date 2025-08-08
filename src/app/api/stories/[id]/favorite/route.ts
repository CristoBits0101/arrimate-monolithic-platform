import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

interface Params {
  params: { id: string }
}

export async function POST(_request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const photoId = params.id
  const userId = session.user.id

  const existing = await db.photoFavorite.findUnique({
    where: { photoId_userId: { photoId, userId } }
  })

  if (existing) {
    await db.photoFavorite.delete({ where: { id: existing.id } })
    return NextResponse.json({ favorite: false })
  }

  await db.photoFavorite.create({ data: { photoId, userId } })
  return NextResponse.json({ favorite: true })
}
