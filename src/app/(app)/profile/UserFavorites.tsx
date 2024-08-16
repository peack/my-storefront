import { useState, useEffect } from 'react'
import { Media, Product } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { getMyFavorites } from '@hooks/useFavorites'

export default function UserFavorites() {
  const [userFavorites, setUserFavorites] = useState<Product[]>([])
  const [message, setMessage] = useState<string | null>('You have no favorites')

  useEffect(() => {
    async function fetchMyFavorites() {
      await getMyFavorites().then((favorites) =>
        favorites ? setUserFavorites(favorites) : setUserFavorites([]),
      )
    }
    fetchMyFavorites()
  }, [])
  return (
    <>
      {userFavorites && userFavorites.length > 0 ? (
        <div>
          <h2 className=" text-2xl font-extrabold tracking-tight lg:text-2xl py-5">
            User Favorites
          </h2>
          {userFavorites.length > 4 ? (
            <div className="flex justify-start px-10">
              <Carousel className="w-[400px]">
                <CarouselContent>
                  {userFavorites.map((favorite) => {
                    return (
                      <CarouselItem className="basis-1/3 md:basis-1/3" key={favorite.slug}>
                        {userFavoriteCard(favorite)}
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <div className="flex justify-start gap-1">
              {userFavorites.map((favorite) => {
                return userFavoriteCard(favorite)
              })}
            </div>
          )}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </>
  )
}

function userFavoriteCard(favorite: Product) {
  const favoriteMedia: Media = (favorite.meta?.image as Media) || null
  return (
    <Card key={favorite.id} className="w-[100px] md:w-[120px]">
      <CardContent className="p[-10px]">
        <Link href={`/products/${favorite.slug}`}>
          <Image
            src={favoriteMedia.url ?? '/Image_NA.png'}
            alt="image "
            width={90}
            height={70}
            layout="responsive"
            className="rounded-md "
          />
        </Link>
      </CardContent>
    </Card>
  )
}
