import React, { lazy, Suspense } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import ProductCardSkeleton from '@/components/Cards/ProductCardSkeleton'
import { getProducts } from './productsUtil'
import { Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
const payload = await getPayloadHMR({ config: configPromise })

const Products = lazy(() => import('./Products'))

export default async function page({ params: { locale } }: { params: { locale: string } }) {
  const data = await getProducts()

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
          {data && <Products data={data as PaginatedDocs<Product>} />}
        </Suspense>
      </div>
    </div>
  )
}
