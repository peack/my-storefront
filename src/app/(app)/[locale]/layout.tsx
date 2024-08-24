import Header from '@/components/Layout/Header'
import { locales } from '@/i18n'
import { Providers } from '@/providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.scss'
import Footer from '@/components/Footer/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const Layout: React.FC<{ children: React.ReactNode; params: { locale: string } }> = async ({
  children,
  params: { locale },
}) => {
  const navLinks = ['Home', 'Products']
  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="flex-col flex-grow space-between bg-gray-100 scrolling">
              <Header slug="Home" navLinks={navLinks} />
              <main>{children}</main>
              <footer>
                <div className=" mx-auto py-4 justify-end flex shadow-sm">
                  <Footer />
                </div>
              </footer>
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
