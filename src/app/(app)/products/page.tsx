import React, { Suspense } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
const payload = await getPayloadHMR({ config: configPromise })

const locale = cookies().get('payload-lng')?.value as 'en' | 'fr' | 'all' | undefined

const data = await payload.find({
  collection: 'products',
  locale: locale,
})

const Products = dynamic(() => import('./Products'), { ssr: false })

export default function page() {
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
