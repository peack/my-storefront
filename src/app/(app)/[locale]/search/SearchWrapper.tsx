'use client'
import ProductCard from '@/components/Cards/ProductCard'
import { getMyFavorites, toggleFavorite } from '@/hooks/useFavorites'
import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'

interface SearchWrapperProps {
  products: Product[]
}
export default function SearchWrapper({ products }: SearchWrapperProps) {
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
      <div className="flex flex-wrap justify-center">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product?.id}
              product={product ?? null}
              isFavorite={myFavorites.includes(product.id) ?? false}
              toggleFavorite={handleToggleFavorite}
            />
          ))}
      </div>
    </>
  )
}
