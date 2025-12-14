import { slugField, type CollectionConfig } from 'payload'

import { turkishToSlug } from '@/utils'
import { hero } from '../blocks'
import { servicesCarousel } from '../services/blocks'

export const PagesCollection: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { en: 'Page', tr: 'Sayfa' },
    plural: { en: 'Pages', tr: 'Sayfalar' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', tr: 'Başlık' },
    },
    slugField({
      useAsSlug: 'title',
      slugify: ({ valueToSlugify }) => {
        if (!valueToSlugify || typeof valueToSlugify !== 'string') return undefined
        return turkishToSlug(valueToSlugify)
      },
    }),
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      label: { en: 'Layout', tr: 'Sayfa Düzeni' },
      labels: {
        singular: { en: 'Layout', tr: 'Sayfa Düzeni' },
        plural: { en: 'Layouts', tr: 'Sayfa Düzenleri' },
      },
      blocks: [hero, servicesCarousel],
    },
  ],
}
