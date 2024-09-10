import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Media, Product } from '@/payload-types'
import { LoginAlert } from '@components/Alerts/LoginAlert'
import { useAuth } from '@/providers/Auth'
import { StarIcon } from 'lucide-react'

interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  toggleFavorite?: (product: Product, isFavorite: boolean) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite = false,
  toggleFavorite,
}) => {
  const productMedia = (product?.meta?.image as Media) || null
  const iconClass = isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
  const status = useAuth().status ?? 'loggedOut'
  return (
    <Card
      className="max-w-[175px] sm:min-w-[300px] sm:w-[300px] h-[475px] flex flex-col justify-between "
      key={product.slug}
    >
      <Link key={product.slug} href={`/products/${product.slug}`}>
        <CardHeader className="flex items-center space-x-4 p-4">
          <Image
            src={productMedia?.url ?? '/Image_NA.png'}
            alt="image "
            style={{ objectFit: 'cover' }}
            width={193}
            height={290}
            className="rounded-lg border shadow-lg h-[290px] w-[193px] "
          />
          <span className="font-bold truncate max-w-[130px] md:max-w-[200px] ">
            {product?.meta?.title ?? product.title}
          </span>
        </CardHeader>
      </Link>
      {product?.meta?.description && (
        <CardContent>
          <p className="line-clamp-2">{product?.meta?.description}</p>
        </CardContent>
      )}
      <CardFooter className={'flex justify-end'}>
        {status === 'loggedIn' ? (
          <StarIcon
            className={iconClass}
            onClick={
              toggleFavorite
                ? () => toggleFavorite(product, isFavorite)
                : () => console.log('error')
            }
          />
        ) : (
          <LoginAlert>
            <StarIcon className={iconClass} />
          </LoginAlert>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
