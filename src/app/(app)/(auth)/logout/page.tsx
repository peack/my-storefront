'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/alert'
import { useAuth } from '@/providers/Auth'
import { toast } from '@/components/ui/use-toast'

interface LogoutMessageProps {
  description: string
  isError: boolean
}

export default function LogoutPage() {
  const router = useRouter()
  const { logout, status } = useAuth()
  const [message, setMessage] = useState<LogoutMessageProps>({
    description: 'Logging out...',
    isError: false,
  })

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        toast({
          title: 'Logout Successful',
        })
        setTimeout(() => router.push('/'), 1500)
      } catch (error) {
        setMessage({
          description: 'An error occurred while logging out. Please try again.',
          isError: true,
        })
      }
    }

    if (status === 'loggedIn') {
      performLogout()
    } else if (status === 'loggedOut') {
      setMessage({
        description: 'You are already logged out.',
        isError: false,
      })
      setTimeout(() => router.push('/'), 2500)
    }
  }, [logout, router, status])

  return (
    <div className="flex justify-center items-center">
      <Alert variant={message.isError ? 'destructive' : 'default'}>{message.description}</Alert>
    </div>
  )
}
