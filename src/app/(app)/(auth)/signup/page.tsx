'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/Loading'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 8 characters long.',
  }),
})

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null)
  const [formMessage, setFormMessage] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login, user, setUser } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const onSubmit = useCallback(
    async (values: { name: string; email: string; password: string }) => {
      setIsLoading(true)
      setError(null)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const message = res.statusText
        setError('There was an error with the credentials provided. Please try again')
        setIsLoading(false)
        return
      }

      // const timer = setTimeout(() => {

      // }, 1000)

      try {
        await login({ email: values.email, password: values.password })
        // clearTimeout(timer)
        setTimeout(() => setIsLoading(false), 500)
        setTimeout(() => router.push('/'), 2000)
        setFormMessage('Account created successfully.')
      } catch (_) {
        // clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
        setTimeout(() => setIsLoading(false), 500)
      }
    },
    [login, router],
  )

  return (
    <div className="flex items-center justify-center h-100vh bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Enter your credentials create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={`Enter email.`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!error && formMessage && <Alert variant="default">{formMessage}</Alert>}
              {isLoading ? (
                <Button type="submit" disabled className="w-full">
                  <Loading />
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              {` Login`}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
