import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import type { Media, Service } from '@/payload-types'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 100,
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              alt="Logo"
              height={32}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
              width={32}
            />
            <span className="font-serif text-xl tracking-tight text-slate-800">Hizmetler</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <span className="text-sm text-slate-600">Hoş geldin, {user.email}</span>
            ) : (
              <Link
                href={payloadConfig.routes.admin}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-light tracking-tight text-slate-900 md:text-5xl">
            Hizmetlerimiz
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Size sunduğumuz profesyonel hizmetleri keşfedin
          </p>
        </div>

        {services.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-500">Henüz hizmet eklenmemiş.</p>
            <Link
              href={payloadConfig.routes.admin}
              className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4 transition-colors hover:text-slate-600"
            >
              Admin panelinden hizmet ekleyin
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200/60 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500">
          Payload CMS ile oluşturuldu
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const coverImage = service.coverImage as Media | null
  const imageUrl = coverImage?.url

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-12 w-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-serif text-xl font-medium text-slate-900 transition-colors group-hover:text-slate-600">
          {service.name}
        </h2>

        {service.description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
            {service.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          {service.duration && (
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {service.duration} dk
            </span>
          )}
          <span className="text-sm font-medium text-slate-900 transition-colors group-hover:text-slate-600">
            Detaylar →
          </span>
        </div>
      </div>
    </Link>
  )
}
