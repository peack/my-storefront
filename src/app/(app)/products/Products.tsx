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
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  )
}
