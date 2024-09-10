import ProductDetailsSlug from './ProductDetailsSlug'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
const payload = await getPayloadHMR({ config: configPromise })

import { Suspense } from 'react'

const Page = ({ params }: { params: { slug: string; locale: string } }) => {
  return (
    <Suspense>
      <ProductDetailsSlug
        productSlug={params.slug}
        locale={(params.locale as 'en' | 'fr') ?? 'fr'}
      />
    </Suspense>
  )
}
export default Page
