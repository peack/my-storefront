import { Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'

export const getProducts = async () => {
  let products: PaginatedDocs<Product> | null = null
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
      },
    })
    await req.json().then((data) => {
      products = data as PaginatedDocs<Product>
    })
  } catch (err) {
    console.log(err)
  }
  return products
}
