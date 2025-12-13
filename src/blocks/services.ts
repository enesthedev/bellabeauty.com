import type { Block } from 'payload'

export const services: Block = {
  slug: 'services',
  labels: {
    singular: { en: 'Services Block', tr: 'Hizmetler Bloğu' },
    plural: { en: 'Services Blocks', tr: 'Hizmetler Blokları' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Heading', tr: 'Başlık' },
      defaultValue: 'Hizmetlerimiz',
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', tr: 'Açıklama' },
      defaultValue: 'Size sunduğumuz profesyonel hizmetleri keşfedin',
    },
  ],
}
