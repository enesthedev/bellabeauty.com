import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

const SEED_MEDIA = {
  video: {
    filename: 'makeup-video.mp4',
    alt: 'Belle Güzellik Merkezi - Makyaj Video',
    mimeType: 'video/mp4',
  },
  thumbnail: {
    filename: 'makeup-video-thumbnail.png',
    alt: 'Belle Güzellik Merkezi - Video Thumbnail',
    mimeType: 'image/png',
  },
}

async function getOrCreateMedia(
  payload: Payload,
  mediaConfig: { filename: string; alt: string; mimeType: string },
): Promise<number | null> {
  const { docs: existingMedia } = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: mediaConfig.filename,
      },
    },
    limit: 1,
  })

  if (existingMedia.length > 0) {
    payload.logger.info(`Media already exists: ${mediaConfig.filename}`)
    return existingMedia[0].id
  }

  const assetsDir = path.resolve(process.cwd(), 'src/seed/assets')
  const filePath = path.join(assetsDir, mediaConfig.filename)

  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Seed asset not found: ${filePath}`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: mediaConfig.alt,
    },
    file: {
      data: fileBuffer,
      name: mediaConfig.filename,
      mimetype: mediaConfig.mimeType,
      size: fileBuffer.length,
    },
  })

  payload.logger.info(`Created media: ${mediaConfig.filename}`)
  return media.id
}

export async function seedHomePage(payload: Payload): Promise<void> {
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  if (existingPages.length > 0) {
    payload.logger.info('Home page already exists, skipping seed')
    return
  }

  payload.logger.info('Seeding home page...')

  const videoId = await getOrCreateMedia(payload, SEED_MEDIA.video)
  const thumbnailId = await getOrCreateMedia(payload, SEED_MEDIA.thumbnail)

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Anasayfa',
      slug: 'ana-sayfa',
      layout: [
        {
          blockType: 'hero',
          showLogo: true,
          backgroundVideo: videoId,
          backgroundImage: thumbnailId,
          actions: [
            {
              label: 'Yol Tarifi Alın',
              link: 'https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8',
              icon: 'map-pin',
            },
            {
              label: 'Randevu Alın',
              link: 'https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum',
              icon: 'phone',
            },
          ],
        },
        {
          blockType: 'services',
          heading: 'Hizmetlerimiz',
          description: 'Geniş güzellik hizmetleri yelpazemizi keşfedin',
        },
      ],
    },
  })

  payload.logger.info('Home page seeded successfully')
}
