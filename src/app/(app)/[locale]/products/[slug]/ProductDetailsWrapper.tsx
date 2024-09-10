'use client'
import ProductDetails from '@/components/Products/ProductDetails'
import { Product } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import { getMyFavorites, toggleFavorite } from '@/hooks/useFavorites'

interface ProductDetailsWrapperProps {
  product: Product | null
}

const ProductError = <Error statusCode={404} />

export default function ProductDetailsWrapper({ product }: ProductDetailsWrapperProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [myFavorites, setMyFavorites] = useState<number[]>([])

  useEffect(() => {
    async function fetchMyFavorites() {
      await getMyFavorites().then((favorites) => {
        favorites ? setMyFavorites(favorites.map((favorite) => favorite.id)) : setMyFavorites([])
        const productId = product?.id as number
        const favoritesIds = favorites.map((favorite) => favorite.id)
        setIsFavorite(favoritesIds.includes(productId))
      })
    }
    fetchMyFavorites()
  }, [isFavorite, product?.id])

  async function handleToggleFavorite(product: Product, isFavorite: boolean) {
    try {
      await toggleFavorite(product, isFavorite)
      isFavorite
        ? setMyFavorites(myFavorites.filter((favorite) => favorite !== product.id))
        : setMyFavorites([...myFavorites, product.id])
      setIsFavorite(!isFavorite)
    } catch (err) {
      console.log(err)
    }
  }

  return product ? (
    <ProductDetails
      key={product?.id}
      product={product}
      isFavorite={isFavorite}
      toggleFavorite={handleToggleFavorite}
    />
  ) : (
    ProductError
  )
}
