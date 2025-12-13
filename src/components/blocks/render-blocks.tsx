import type { Service } from '@/payload-types'

import { CTABlock } from './cta-block'
import { FeaturesBlock } from './features-block'
import { GalleryBlock } from './gallery-block'
import { HeroBlock } from './hero-block'

type ContentBlocks = NonNullable<Service['content']>

interface RenderBlocksProps {
  blocks: ContentBlocks | null | undefined
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <HeroBlock
                key={block.id}
                heading={block.heading}
                subheading={block.subheading ?? undefined}
                backgroundImage={block.backgroundImage ?? undefined}
              />
            )
          case 'gallery':
            return <GalleryBlock key={block.id} images={block.images ?? undefined} />
          case 'features':
            return <FeaturesBlock key={block.id} features={block.features ?? undefined} />
          case 'cta':
            return (
              <CTABlock
                key={block.id}
                heading={block.heading}
                description={block.description ?? undefined}
                buttonText={block.buttonText}
                buttonLink={block.buttonLink}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

