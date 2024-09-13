'use client'
import Loading from '@/components/ui/Loading'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

enum Status {
  IDLE = 'idle',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export default function Verify({ token }: { token: string }) {
  const router = useRouter()

  const [status, setStatus] = useState<Status>(Status.IDLE)
  const [message, setMessage] = useState<string | null>('Verification will begin shortly')

  useEffect(() => {
    const verify = async () => {
      setStatus(Status.LOADING)
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/verify/${token}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await req.json()
        console.log(data)
        if (data.errors) {
          // TODO: handle potential multiple errors
          setStatus(Status.ERROR)
          setMessage(data.errors[0].message)
          toast({
            title: data.errors[0].message,
            variant: 'destructive',
          })
        } else {
          toast({
            title: data.message,
          })
          setMessage(data.message)
          setStatus(Status.SUCCESS)
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        }
        return
      } catch (err) {
        toast({
          title: `Error occurred: ${err}`,
          variant: 'destructive',
        })
        setMessage(`Error occurred: ${err}`)
        setStatus(Status.ERROR)
        return
      }
    }

    verify()
  }, [token, router])

  return (
    <div>
      {status === Status.LOADING ? (
        <div className="flex mx-auto justify-center items-center align-middle h-[50vh]">
          <Loading width={50} height={50} />
        </div>
      ) : (
        <div className="flex h-[40vh]">{message}</div>
      )}
    </div>
  )
}
