import React, { Suspense } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import dynamic from 'next/dynamic'
const payload = await getPayloadHMR({ config: configPromise })

export default async function Page({ params }: { params: { slug: string } }) {
  const ProductDetails = dynamic(() => import('@/components/Products/ProductDetails'))
  const data = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  const product = data.docs[0] ?? null

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails key={product?.id} product={product} />
    </Suspense>
  )
}
