import type { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import type { Media, Service } from '@/payload-types'

import { RenderBlocks } from '@/components/blocks/render-blocks'
import config from '@/payload.config'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: await config })
  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 1000,
  })

  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const service = docs[0]
  if (!service) return { title: 'Hizmet Bulunamadı' }

  return {
    title: `${service.name} | Hizmetler`,
    description: service.description || undefined,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const service = docs[0] as Service | undefined
  if (!service) notFound()

  const coverImage = service.coverImage as Media | null
  const imageUrl = coverImage?.url

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
            <Image
              alt="Logo"
              height={32}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
              width={32}
            />
            <span className="font-serif text-xl tracking-tight text-slate-800">Hizmetler</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            ← Tüm Hizmetler
          </Link>
        </div>
      </header>

      <main>
        {imageUrl && (
          <div className="relative h-[40vh] min-h-[300px] w-full">
            <Image src={imageUrl} alt={service.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mx-auto max-w-7xl">
                <h1 className="font-serif text-4xl font-light tracking-tight text-white md:text-5xl">
                  {service.name}
                </h1>
                {service.duration && (
                  <div className="mt-4 flex items-center gap-2 text-white/80">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{service.duration} dakika</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-12">
          {!imageUrl && (
            <div className="mb-8">
              <h1 className="font-serif text-4xl font-light tracking-tight text-slate-900 md:text-5xl">
                {service.name}
              </h1>
              {service.duration && (
                <div className="mt-4 flex items-center gap-2 text-slate-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{service.duration} dakika</span>
                </div>
              )}
            </div>
          )}

          {service.description && (
            <div className="mb-12 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <p className="text-lg leading-relaxed text-slate-700">{service.description}</p>
            </div>
          )}

          <RenderBlocks blocks={service.content} />
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500">
          Payload CMS ile oluşturuldu
        </div>
      </footer>
    </div>
  )
}

