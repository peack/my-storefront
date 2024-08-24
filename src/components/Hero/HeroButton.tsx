'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function HeroButton({ ctaLink, ctaText }: { ctaLink: string; ctaText: string }) {
  const router = useRouter()
  return (
    <Button
      variant={'link'}
      onClick={() => router.push(ctaLink)}
      className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full text-lg"
    >
      {ctaText}
    </Button>
  )
}
