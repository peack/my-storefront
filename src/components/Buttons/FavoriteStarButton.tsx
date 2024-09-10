'use client'

import { StarIcon } from 'lucide-react'
import { LoginAlert } from '../Alerts/LoginAlert'
import { Product } from '@/payload-types'
import { useAuth } from '@/providers/Auth'

interface FavoriteStarButtonProps {
  product: Product
  isFavorite?: boolean
  toggleFavorite?: (product: Product, isFavorite: boolean) => void
}

export default function FavoriteStarButton({
  product,
  isFavorite = false,
  toggleFavorite,
}: FavoriteStarButtonProps) {
  const status = useAuth().status ?? 'loggedOut'
  const iconClass = isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'

  return (
    <>
      {status === 'loggedIn' ? (
        <StarIcon
          className={iconClass}
          onClick={
            toggleFavorite ? () => toggleFavorite(product, isFavorite) : () => console.log('error')
          }
        />
      ) : (
        <LoginAlert>
          <StarIcon className={iconClass} />
        </LoginAlert>
      )}
    </>
  )
}
