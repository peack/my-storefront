import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Suspense } from 'react'
import { Product } from '@/payload-types'
import SearchWrapper from './SearchWrapper'
const payload = await getPayloadHMR({ config: configPromise })

interface SearchProps {
  params: { locale: string }
  searchParams: {
    q: string
  }
}

export default async function page({ params, searchParams }: SearchProps) {
  const userQuery = searchParams.q

  const ids = await payload
    .find({
      collection: 'search',
      locale: (params.locale as 'en' | 'fr' | 'all') ?? 'fr',
      depth: 2,
      where: {
        title: {
          like: userQuery,
        },
      },
    })
    .then((data) => {
      const prods: string[] = data?.docs.map((product: any) => {
        return product.id
      })
      return prods
    })

  const fetchData = async (ids: string[]) => {
    const products = await Promise.all(
      ids.map(async (id) => {
        try {
          return await payload.findByID({
            collection: 'products',
            id,
            locale: (params.locale as 'en' | 'fr' | 'all') ?? 'fr',
          })
        } catch (error) {
          console.error(`Error fetching product with id: ${id}`, error)
          return null
        }
      }),
    )
    return products.filter(Boolean)
  }
  const data = await fetchData(ids)

  return (
    <>
      <div className="text-3xl py-2 pb-4">Showing search results for: {userQuery} </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchWrapper products={data as Product[]} />
      </Suspense>
    </>
  )
}
