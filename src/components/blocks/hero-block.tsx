import type { Media } from '@/payload-types'

interface HeroBlockProps {
  heading: string
  subheading?: string
  backgroundImage?: Media | string
}

export function HeroBlock({ heading, subheading, backgroundImage }: HeroBlockProps) {
  const imageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : undefined

  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className="relative z-10 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{heading}</h1>
        {subheading && (
          <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">{subheading}</p>
        )}
      </div>
    </section>
  )
}

