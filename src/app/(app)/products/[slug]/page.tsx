import { cookies } from 'next/headers'
import ProductDetailsSlug from './ProductDetailsSlug'
import { Suspense } from 'react'

export default function Page({ params }: { params: { slug: string }; cookies: any }) {
  const locale = cookies().get('payload-lng')?.value as 'en' | 'fr' | 'all' | undefined
  return (
    <Suspense>
      <ProductDetailsSlug productSlug={params.slug} locale={locale} />
    </Suspense>
  )
}
