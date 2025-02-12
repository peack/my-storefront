import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'never',
})

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/products/:path*',
    '/login',
    '/search',
    '/signup',
    '/profile',
    '/logout',
    '/api',
    '/(en|fr)/:path*',
    '/(en|fr)/products/:slug*',
    '/(en|fr)/products',
    '/(en|fr)/login',
    '/favicon.ico',
    '/verify/:token*',
    '/forgot',
    '/reset/:token*',
  ],
}
