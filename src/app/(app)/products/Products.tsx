import ProductCard from '@/components/Cards/ProductCard'
import { PaginatedDocs } from 'payload'
import { Product } from 'payload-types'
import React from 'react'

interface ProductsProps {
  data: PaginatedDocs<Product>
}

export default function Products({ data }: ProductsProps) {
  return (
    <>
      <ul>
        {data.docs.map((product) => (
          <ProductCard key={product.id} product={product} isFavorite={false} />
        ))}
      </ul>
    </>
  )
}
