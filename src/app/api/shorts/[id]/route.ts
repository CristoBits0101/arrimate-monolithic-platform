import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const short = await db.short.findUnique({ where: { id: params.id } })
  if (!short)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (short.userId !== session.user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { title, description } = await request.json()

  const updated = await db.short.update({
    where: { id: params.id },
    data: {
      title: title ?? short.title,
      description: description ?? short.description
    }
  })

  return NextResponse.json({ short: updated })
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const short = await db.short.findUnique({ where: { id: params.id } })
  if (!short)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (short.userId !== session.user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await db.short.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

