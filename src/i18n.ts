import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { error } from 'console'

// Can be imported from a shared config
export const locales = ['en', 'fr']

export default getRequestConfig(async ({ locale }: any) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) console.log(error)

  const messages = (await import(`/public/messages/${locale}.json`)).default

  return {
    messages,
  }
})
