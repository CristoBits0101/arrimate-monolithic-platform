import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

interface Params {
  params: {
    id: string
  }
}

// Configure cloudinary
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

  const contentType = request.headers.get('content-type') || ''

  // If the request is multipart/form-data, handle potential image upload
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const file = formData.get('file')
    const description = formData.get('description') as string | null
    const hashtagsRaw = formData.get('hashtags') as string | null

    let imageUrl = photo.imageUrl

    if (file && file instanceof Blob) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const upload = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) reject(error)
            resolve(result as { secure_url: string })
          })
          .end(buffer)
      })

      imageUrl = upload.secure_url
    }

    const hashtags = hashtagsRaw
      ? hashtagsRaw
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : photo.hashtags

    const updated = await db.photo.update({
      where: { id: params.id },
      data: {
        title: description ?? photo.title,
        description: description ?? photo.description,
        imageUrl,
        hashtags
      }
    })

    return NextResponse.json({ photo: updated })
  }

  // Otherwise, assume JSON payload for metadata updates
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

  // Attempt to delete the resource from Cloudinary
  const segments = photo.imageUrl.split('/')
  const publicIdWithExt = segments[segments.length - 1]
  const publicId = publicIdWithExt.split('.')[0]

  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting image from Cloudinary', error)
  }

  await db.photo.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
