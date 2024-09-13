'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/Loading'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Status } from '@myTypes/myTypes'
import { Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ResetProps {
  token: string
}

const formSchema = z.object({
  password: z.string().min(4, { message: 'Password must be at least 4 characters long.' }),
})

export default function ResetPassword({ token }: ResetProps) {
  const router = useRouter()
  const login = useAuth().login

  const [status, setStatus] = useState<Status>(Status.IDLE)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })
  async function handleSubmit(values: { password: string }) {
    setStatus(Status.LOADING)
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: values.password,
        }),
      })
      const data = await req.json()
      if (data.errors) {
        setStatus(Status.ERROR)
        data.errors.map((err: any) => {
          toast({
            title: err.message,
            variant: 'destructive',
          })
        })
      } else {
        setStatus(Status.SUCCESS)
        toast({
          title: data.message,
        })
        try {
          login({ email: data.user.email, password: values.password })
          setTimeout(() => {
            router.push('/')
          }, 1800)
        } catch (err: any) {
          toast({
            title: `Something went wrong: ${err.message}`,
            variant: 'destructive',
          })
        }
      }
    } catch (err) {
      setStatus(Status.ERROR)
    }
  }

  return (
    <>
      <div className="flex w-screen, min-h-[60dvh] p-2">
        <div className="flex w-screen mx-auto max-w-sm justify-center items-center align-middle">
          <div className="flex-col">
            <div className="flex-col">
              <div className="text-xl py-2">Recover Password</div>
              <div>Please enter your new password below.</div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full space-y-2 pt-5">
                <FormField
                  control={form.control}
                  name="password"
                  disabled={status === Status.LOADING}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={status === Status.LOADING} className="w-full">
                  {status === Status.LOADING ? <Loading /> : 'Submit'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
