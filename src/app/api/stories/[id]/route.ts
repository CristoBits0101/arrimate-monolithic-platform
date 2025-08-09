import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

interface Params {
  params: {
    id: string
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const photo = await db.photo.findUnique({ where: { id: params.id } })
  if (!photo)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (photo.userId !== session.user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { title, description, hashtags, location } = await request.json()

  const updated = await db.photo.update({
    where: { id: params.id },
    data: {
      title: title ?? photo.title,
      description: description ?? photo.description,
      hashtags: Array.isArray(hashtags) ? hashtags : photo.hashtags,
      location: location ?? photo.location
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

  const parts = photo.imageUrl.split('/')
  const last = parts[parts.length - 1]
  const publicId = last.split('.')[0]
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (e) {
    console.error('Cloudinary deletion failed', e)
  }

  await db.photo.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
