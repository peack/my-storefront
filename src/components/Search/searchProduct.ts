import qs from 'qs'
import { Product } from '@/payload-types'

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const stringifiedQuery = qs.stringify(
      {
        where: {
          title: {
            like: query,
          },
        },
        limit: 8,
      },
      { addQueryPrefix: true },
    )

    const req = await fetch(`/api/search/${stringifiedQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await req.json()

    const prods = data?.docs.map((product: Product) => product)
    return prods
  } catch (error) {
    console.error('Error fetching search results:', error)
    return []
  }
}
