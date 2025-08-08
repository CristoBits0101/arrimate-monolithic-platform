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

  const photo = await db.photo.update({
    where: { id: params.id },
    data: { shareCount: { increment: 1 } },
    select: { shareCount: true }
  })

  return NextResponse.json({ shareCount: photo.shareCount })
}
