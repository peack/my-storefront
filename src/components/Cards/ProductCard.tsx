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
  isFavorite: boolean
  toggleFavorite?: (product: Product, isFavorite: boolean) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite = false,
  toggleFavorite,
}) => {
  const productMedia = (product?.meta?.image as Media) || null
  const iconClass = isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
  const status = useAuth().status
  return (
    <Card className="  w-[160px] md:w-[300px] m-1" key={product.slug}>
      <Link key={product.slug} href={`/products/${product.slug}`}>
        <CardHeader className="flex items-center space-x-4  p-4">
          <Image
            src={productMedia?.url ?? '/Image_NA.png'}
            alt="image "
            width={250}
            height={200}
            className="rounded-s-sm border "
          />
          <span className="font-bold">{product?.meta?.title ?? product.title}</span>
        </CardHeader>
      </Link>
      {product?.meta?.description && (
        <CardContent>
          <p>{product?.meta?.description}</p>
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
