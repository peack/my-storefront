'use client'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import ProfileHeader from './ProfileHeader'
import UserFavorites from './UserFavorites'

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
      <Suspense fallback={<div>Loading...</div>}>
        <UserFavorites />
      </Suspense>
    </>
  )
}
