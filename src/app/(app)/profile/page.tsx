'use client'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import ProfileHeader from './ProfileHeader'
import UserFavorites from './UserFavorites'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export default function Profile() {
  const { status } = useAuth()
  const router = useRouter()

  console.log(status)
  if (status === undefined) {
    return <div>Loading ...</div>
  }

  if (status === 'loggedOut') {
    router.push('/login')
    return null
  }
  return (
    <>
      <ProfileHeader />
      <div className="container">
        TEsting toast
        <Button
          variant="secondary"
          onClick={() => toast({ title: 'Test', description: 'This is just a test huhuhu' })}
        >
          Test
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserFavorites />
      </Suspense>
    </>
  )
}
