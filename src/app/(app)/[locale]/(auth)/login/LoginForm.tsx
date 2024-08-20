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
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastProps, ToastTitleProps } from '@radix-ui/react-toast'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters long.',
  }),
})

export default function MyLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { user, status, login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('LoginPage')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    console.log(status)
    if (status === 'loggedIn') {
      router.push('/')
    }
  }, [user, status, router])
  async function onSubmit(values: { email: string; password: string }) {
    setIsLoading(true)
    setError(null)
    try {
      const myUser = await login(values)
      setTimeout(() => router.push('/'), 2500)
      setTimeout(() => setIsLoading(false), 1000)
      toast({
        title: 'Login Successful',
        description: myUser ? `Welcome back ${myUser.name} !` : `Welcome back ${values.email}!`,
        variant: 'default',
      })
    } catch (error) {
      console.log(error)
      setError('An error occurred while logging in. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-100vh bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t('login_form_card_header_title_label')}</CardTitle>
          <CardDescription>{t('login_form_card_header_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('login_form_email_placeholder')}
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder={t('login_form_password_placeholder')}
                        {...field}
                      />
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
              {!isLoading ? (
                <Button type="submit" className="w-full">
                  {t('login_form_button_label')}
                </Button>
              ) : (
                <Button type={undefined} disabled className="w-full">
                  <Loading />
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {t('login_form_card_footer_link_description')}
            <a href="/signup" className="text-blue-600 hover:underline">
              {t('login_form_card_footer_link_label')}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
