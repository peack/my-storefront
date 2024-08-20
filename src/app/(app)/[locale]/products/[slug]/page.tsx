import ProductDetailsSlug from './ProductDetailsSlug'
import { Suspense } from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  const myLocale = 'en'
  console.log(`params: ${JSON.stringify(params)}`)
  console.log(`params.slug: ${params.slug}`)
  return (
    <Suspense>
      <ProductDetailsSlug productSlug={params.slug} locale={myLocale as 'en' | 'fr'} />
    </Suspense>
  )
}
export default Page
