import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import type { MediaConfig } from './types'

export const MEDIA_ASSETS = {
  logo: {
    filename: 'belle-guzellik.png',
    alt: 'Belle Güzellik Merkezi Logo',
    mimeType: 'image/png',
  },
} as const

export async function getOrCreateMedia(
  payload: Payload,
  mediaConfig: MediaConfig,
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

  const assetsDir = path.resolve(process.cwd(), 'src/assets')
  const filePath = path.join(assetsDir, mediaConfig.filename)

  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Seed asset not found: ${filePath}`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)
  const fileData = new Uint8Array(fileBuffer)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: mediaConfig.alt,
    },
    file: {
      data: fileData,
      name: mediaConfig.filename,
      mimetype: mediaConfig.mimeType,
      size: fileData.length,
    },
  })

  payload.logger.info(`Created media: ${mediaConfig.filename}`)
  return media.id
}
