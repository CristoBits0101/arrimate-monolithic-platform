import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

interface Params {
  params: { id: string }
}

export async function POST(request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content } = await request.json()
  if (!content || typeof content !== 'string')
    return NextResponse.json({ error: 'Content required' }, { status: 400 })

  const comment = await db.shortComment.create({
    data: { shortId: params.id, userId: session.user.id, content }
  })

  return NextResponse.json({ comment })
}

