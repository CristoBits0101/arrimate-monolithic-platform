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

  const shorts = await db.short.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      _count: { select: { likes: true, comments: true } },
      ...(userId
        ? { likes: { where: { userId }, select: { id: true } } }
        : {})
    }
  })

  const formatted = shorts.map((short: any) => {
    const { likes = [], ...rest } = short
    const liked = userId ? likes.length > 0 : false
    return { ...rest, liked }
  })

  return NextResponse.json({ shorts: formatted })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')
  const description = formData.get('description') as string | null
  const title = formData.get('title') as string | null

  if (!file || !(file instanceof Blob))
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const response = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'video', folder: 'shorts' },
        (error, result) => {
          if (error) reject(error)
          resolve(result)
        }
      )
      .end(buffer)
  })

  if (response.duration && response.duration > 60) {
    if (response.public_id) {
      await cloudinary.uploader.destroy(response.public_id, {
        resource_type: 'video'
      })
    }
    return NextResponse.json(
      { error: 'Video exceeds 60 seconds limit' },
      { status: 400 }
    )
  }

  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const short = await db.short.create({
    data: {
      title: title || 'Short',
      description: description || undefined,
      videoUrl: response.secure_url,
      userId: session.user.id
    }
  })

  return NextResponse.json({
    message: 'File uploaded successfully',
    url: response.secure_url,
    short
  })
}

