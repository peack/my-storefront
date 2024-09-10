'use client'
import ProductDetails from '@/components/Products/ProductDetails'
import { Product } from '@/payload-types'
import React from 'react'
import Error from 'next/error'

interface ProductDetailsWrapperProps {
  product: Product | null
}

const ProductError = <Error statusCode={404} />

export default function ProductDetailsWrapper({ product }: ProductDetailsWrapperProps) {
  return product ? <ProductDetails key={product?.id} product={product} /> : ProductError
}
