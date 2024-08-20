import ProductDetails from '@/components/Products/ProductDetails'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React, { Suspense } from 'react'
import configPromise from '@payload-config'
const payload = await getPayloadHMR({ config: configPromise })

interface ProductDetailsSlugProps {
  productSlug: string
  locale: 'en' | 'fr' | 'all' | undefined
}

export default async function ProductDetailsSlug({ productSlug, locale }: ProductDetailsSlugProps) {
  const data = await payload.find({
    collection: 'products',
    locale: locale,
    where: {
      slug: {
        equals: productSlug,
      },
    },
  })

  const product = data.docs[0] ?? null

  return <ProductDetails key={product?.id} product={product} />
}
