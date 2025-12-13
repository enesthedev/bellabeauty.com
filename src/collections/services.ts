import { slugField, type CollectionConfig } from 'payload'

import { turkishToSlug } from '@/utils'
import { cta } from '../blocks/cta'
import { features } from '../blocks/features'
import { gallery } from '../blocks/gallery'
import { hero } from '../blocks/hero'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { en: 'Service', tr: 'Hizmet' },
    plural: { en: 'Services', tr: 'Hizmetler' },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Service Name', tr: 'Hizmet Adı' },
      required: true,
    },
    slugField({
      useAsSlug: 'name',
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => {
        if (!valueToSlugify || typeof valueToSlugify !== 'string') return undefined
        return turkishToSlug(valueToSlugify)
      },
    }),
    {
      name: 'coverImage',
      type: 'upload',
      label: { en: 'Cover Image', tr: 'Kapak Resmi' },
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', tr: 'Açıklama' },
    },
    {
      name: 'duration',
      type: 'number',
      label: { en: 'Duration (min)', tr: 'Süre (dk)' },
      admin: {
        position: 'sidebar',
        description: { en: 'Duration in minutes', tr: 'Dakika cinsinden süre' },
      },
    },
    {
      name: 'content',
      type: 'blocks',
      label: { en: 'Content', tr: 'İçerik' },
      labels: {
        singular: { en: 'Content', tr: 'İçerik' },
        plural: { en: 'Contents', tr: 'İçerikler' },
      },
      blocks: [hero, gallery, features, cta],
    },
  ],
}
