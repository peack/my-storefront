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
  console.log(searchParams.q)
  const userQ = searchParams.q
  // const jsonQuery = JSON.parse(searchParams.q)
  // console.log(`queyr:`, jsonQuery)

  const ids = await payload
    .find({
      collection: 'search',
      locale: (params.locale as 'en' | 'fr' | 'all') ?? 'fr',
      depth: 2,
      where: {
        title: {
          like: userQ,
        },
      },
    })
    .then((data) => {
      const prods: string[] = data?.docs.map((product: any) => {
        return product.id
      })
      return prods
    })

  // const data = async () => {
  const fetchData = async (ids: string[]) => {
    const products = await Promise.all(
      ids.map(async (id) => {
        try {
          return await payload.findByID({ collection: 'products', id })
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
      <div className="text-3xl py-2 pb-4">Showing search results for: {userQ} </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchWrapper products={data as Product[]} />
      </Suspense>
    </>
  )
}
