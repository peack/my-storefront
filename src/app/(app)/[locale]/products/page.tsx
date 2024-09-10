import React, { lazy, Suspense } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import ProductCardSkeleton from '@/components/Cards/ProductCardSkeleton'
const payload = await getPayloadHMR({ config: configPromise })

const Products = lazy(() => import('./Products'))

export default async function page({ params: { locale } }: { params: { locale: string } }) {
  const data = await payload.find({
    collection: 'products',
    locale: (locale as 'en' | 'fr' | 'all') ?? 'fr',
  })

  const Skeleton = () => (
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  )

  return (
    <div>
      <h1 className="py-6 text-4xl">Products</h1>
      <div className="flex flex-wrap justify-center lg:justify-start gap-1 ">
        <Suspense fallback={<Skeleton />}>
          <Products data={data} />
        </Suspense>
      </div>
    </div>
  )
}
