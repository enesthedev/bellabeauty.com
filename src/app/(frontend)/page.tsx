import { RenderBlocks } from '@/components/blocks/render-blocks'
import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const homePage = pages[0]

  if (!homePage) {
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
      <RenderBlocks blocks={homePage.layout} />
    </main>
  )
}
