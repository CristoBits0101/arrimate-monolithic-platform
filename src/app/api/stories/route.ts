'use server'

// Cloudinary
import { v2 as cloudinary } from 'cloudinary'
import { db } from '@/lib/orm/prisma-client'
import { auth } from '@/lib/auth/auth'

// Response
import { NextResponse } from 'next/server'

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? parseInt(limitParam, 10) : 10

  const session = await auth()
  const userId = session?.user?.id

  const photos = await db.photo.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      _count: {
        select: { likes: true, comments: true, favorites: true }
      },
      ...(userId
        ? { likes: { where: { userId }, select: { id: true } } }
        : {})
    }
  })

  const formatted = photos.map((photo: any) => {
    const { likes = [], ...rest } = photo
    const liked = userId ? likes.length > 0 : false
    return { ...rest, liked }
  })

  return NextResponse.json({ photos: formatted })
}

export async function POST(request: Request) {
  // Get the form data
  const formData = await request.formData()

  // Get the file from the form data
  const file = formData.get('file')
  const description = formData.get('description') as string | null
  const location = formData.get('location') as string | null
  const hashtagsRaw = formData.get('hashtags') as string | null

  // Check if a file was uploaded
  if (!file || !(file instanceof Blob))
    // Bad request if file missing
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  // Read the file as a buffer
  const bytes = await file.arrayBuffer()

  // Save the file in the memory
  const buffer = Buffer.from(bytes)

  // Upload an image
  const response = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error)
          resolve(result as { secure_url: string })
        })
        .end(buffer)
    }
  )

  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const hashtags = hashtagsRaw
    ? hashtagsRaw
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  const photo = await db.photo.create({
    data: {
      title: description || 'Story',
      description: description || undefined,
      imageUrl: response.secure_url,
      photographer: session.user.name || 'Unknown',
      hashtags,
      location: location || undefined,
      userId: session.user.id
    }
  })

  return NextResponse.json({
    message: 'File uploaded successfully',
    url: response.secure_url,
    photo
  })
}
