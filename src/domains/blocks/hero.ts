import type { Block } from 'payload'

export const hero: Block = {
  slug: 'hero',
  labels: {
    singular: { en: 'Hero Section', tr: 'Kahraman Bölümü' },
    plural: { en: 'Hero Sections', tr: 'Kahraman Bölümleri' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Heading', tr: 'Başlık' },
      required: false,
    },
    {
      name: 'showLogo',
      type: 'checkbox',
      label: { en: 'Show Logo', tr: 'Logoyu Göster' },
      defaultValue: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: { en: 'Subheading', tr: 'Alt Başlık' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background Image', tr: 'Arka Plan Resmi' },
      relationTo: 'media',
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: { en: 'Background Video', tr: 'Arka Plan Videosu' },
      relationTo: 'media',
    },
    {
      name: 'actions',
      type: 'array',
      label: { en: 'Action Buttons', tr: 'Aksiyon Butonları' },
      labels: {
        singular: { en: 'Action', tr: 'Aksiyon' },
        plural: { en: 'Actions', tr: 'Aksiyonlar' },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: { en: 'Label', tr: 'Etiket' },
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: { en: 'Link (URL)', tr: 'Bağlantı (URL)' },
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: { en: 'Icon', tr: 'İkon' },
          options: [
            { label: { en: 'Map (Location)', tr: 'Harita (Konum)' }, value: 'map-pin' },
            { label: { en: 'Phone', tr: 'Telefon' }, value: 'phone' },
            { label: { en: 'Clock', tr: 'Saat' }, value: 'clock' },
          ],
        },
      ],
    },
  ],
}
