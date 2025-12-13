import { slugField, type CollectionConfig } from 'payload'

import { turkishToSlug } from '@/utils'
import { hero } from '../blocks/hero'
import { services } from '../blocks/services'

export const Pages: CollectionConfig = {
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
      blocks: [hero, services],
    },
  ],
}
