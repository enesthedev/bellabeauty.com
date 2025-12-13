import type { Block } from 'payload'

export const hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Kahraman Bölümü',
    plural: 'Kahraman Bölümleri',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Başlık',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Alt Başlık',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Arka Plan Resmi',
      relationTo: 'media',
    },
  ],
}

