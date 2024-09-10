import { useState, useEffect } from 'react'
import { Media, Product } from '@/payload-types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
            <div className="flex justify-start md:justify-center px-10">
              <Carousel className="w-full px-10">
                <CarouselContent>
                  {userFavorites.map((favorite) => {
                    return (
                      <CarouselItem
                        className="basis-1/3 sm:basis-1/4 md:basis-1/4"
                        key={favorite.slug}
                      >
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
    <Card key={favorite.id} className=" min-w-[110px]">
      <CardHeader>
        {/* <CardContent className="flex justify-center"> */}
        <div className="flex">
          <Link href={`/products/${favorite.slug}`}>
            <Image
              src={favoriteMedia?.url ?? '/Image_NA.png'}
              alt={favoriteMedia?.alt ?? `Image of ${favorite.meta?.title ?? 'No image found'}`}
              width={100}
              height={150}
              style={{ objectFit: 'fill' }}
              className="rounded-md "
            />
          </Link>
        </div>

        {/* </CardContent> */}
      </CardHeader>
    </Card>
  )
}
