import React, { Suspense } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { PayloadRequest } from 'payload'
const payload = await getPayloadHMR({ config: configPromise })

const Products = dynamic(() => import('./Products'), { ssr: false })

export default async function page(req: any) {
  // const locale = (cookies().get('payload-lng')?.value as 'en' | 'fr' | 'all' | undefined) ?? 'en'
  const locale = 'en'
  const data = await payload.find({
    collection: 'products',
    locale: locale,
  })

  return (
    <div>
      <h1>Welcome to the product page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-wrap justify-center md:justify-start mx-[-10px] sm:mx-0">
          <Products data={data} />
        </div>
      </Suspense>
    </div>
  )
}
