import { RenderBlocks } from '@/components/render-blocks'
import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'anasayfa',
      },
    },
    limit: 1,
  })

  const page = pages[0]

  if (!page) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4 text-center p-4">
        <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
        <p>Ana sayfa içeriği henüz oluşturulmadı.</p>
        <p className="text-muted-foreground">
          Lütfen Admin Paneline gidip başlığı "Home" olan bir sayfa oluşturun.
        </p>
      </div>
    )
  }

  return (
    <main>
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
