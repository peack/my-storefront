'use client'
import ProductCard from '@/components/Cards/ProductCard'
import { getMyFavorites, toggleFavorite } from '@/hooks/useFavorites'
import { Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import React, { useEffect, useState } from 'react'

interface ProductsProps {
  data: PaginatedDocs<Product>
}

export default function Products({ data }: ProductsProps) {
  const [myFavorites, setMyFavorites] = useState<number[]>([])
  useEffect(() => {
    async function fetchMyFavorites() {
      await getMyFavorites().then((favorites) => {
        favorites ? setMyFavorites(favorites.map((favorite) => favorite.id)) : setMyFavorites([])
      })
    }
    fetchMyFavorites()
  }, [])

  async function handleToggleFavorite(product: Product, isFavorite: boolean) {
    try {
      await toggleFavorite(product, isFavorite)
      isFavorite
        ? setMyFavorites(myFavorites.filter((favorite) => favorite !== product.id))
        : setMyFavorites([...myFavorites, product.id])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {data.docs.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={myFavorites.includes(product.id) ?? false}
          toggleFavorite={handleToggleFavorite}
        />
      ))}
    </>
  )
}
