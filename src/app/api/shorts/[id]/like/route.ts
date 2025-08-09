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

  const shortId = params.id
  const userId = session.user.id

  const existing = await db.shortLike.findUnique({
    where: { shortId_userId: { shortId, userId } }
  })

  if (existing) {
    await db.shortLike.delete({ where: { id: existing.id } })
    return NextResponse.json({ liked: false })
  }

  await db.shortLike.create({ data: { shortId, userId } })
  return NextResponse.json({ liked: true })
}

