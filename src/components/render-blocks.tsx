import { CTABlock } from '@/domains/blocks/cta.client'
import { FeaturesBlock } from '@/domains/blocks/features.client'
import { GalleryBlock } from '@/domains/blocks/gallery.client'
import { HeroBlock } from '@/domains/blocks/hero.client'
import { ServicesCarouselBlock } from '@/domains/services/blocks/services-carousel.client'

interface Block {
  blockType: string
  [key: string]: any
}

interface RenderBlocksProps {
  blocks: Block[] | null | undefined
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-0">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <HeroBlock
                key={block.id || index}
                heading={block.heading}
                subheading={block.subheading}
                backgroundImage={block.backgroundImage}
                backgroundVideo={block.backgroundVideo}
                showLogo={block.showLogo}
                actions={block.actions}
              />
            )
          case 'services-carousel':
            return (
              <ServicesCarouselBlock
                key={block.id || index}
                heading={block.heading}
                description={block.description}
              />
            )
          case 'gallery':
            return <GalleryBlock key={block.id || index} images={block.images} />
          case 'features':
            return <FeaturesBlock key={block.id || index} features={block.features} />
          case 'cta':
            return (
              <CTABlock
                key={block.id || index}
                heading={block.heading}
                description={block.description}
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
