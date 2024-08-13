'use client'
import { Button } from '@/components/ui/button'
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

      <div className="container">
        <div className="h2">Also here's a button</div>
        <Button variant="default" onClick={() => console.log('clicked')}>
          Click me
        </Button>
      </div>
    </>
  )
}
