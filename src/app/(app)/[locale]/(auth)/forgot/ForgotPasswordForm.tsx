'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
})

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  async function onSubmit(values: { email: string }) {
    setIsLoading(true)
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
      })
      const data = await req.json()
      if (data.errors) {
        data.errors.map((err: any) => {
          toast({
            title: err.message,
            variant: 'destructive',
          })
        })
      } else {
        toast({
          title: data.message,
        })
      }
      setIsLoading(false)
    } catch (err) {
      toast({
        title: `Error occurred: ${err}`,
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <>
      <div className="flex w-screen,  min-h-[60dvh]">
        <div className="flex w-screen mx-auto max-w-sm justify-center items-center align-middle">
          <div className="flex-col">
            <div className="flex-col">
              <div className="text-xl py-2">Recover Password</div>
              <div>
                Please enter your email below. You will receive an email message with instructions
                on how to reset your password.
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-2 pt-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <Link className={buttonVariants({ variant: 'link' }) + ' -mx-3'} href={`/login`}>
                  Back to login
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
