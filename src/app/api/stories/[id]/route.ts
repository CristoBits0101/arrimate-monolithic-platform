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

  const photo = await db.photo.findUnique({ where: { id: params.id } })
  if (!photo)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (photo.userId !== session.user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { title, description, hashtags } = await request.json()

  const updated = await db.photo.update({
    where: { id: params.id },
    data: {
      title: title ?? photo.title,
      description: description ?? photo.description,
      hashtags: Array.isArray(hashtags) ? hashtags : photo.hashtags
    }
  })

  return NextResponse.json({ photo: updated })
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const photo = await db.photo.findUnique({ where: { id: params.id } })
  if (!photo)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (photo.userId !== session.user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await db.photo.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
