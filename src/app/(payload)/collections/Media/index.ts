import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    resizeOptions: {
      width: 1024,
      height: 768,
    },
  },
}
