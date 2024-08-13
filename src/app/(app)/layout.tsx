import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Layout/Header'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navLinks = ['Home', 'Products', 'Admin']
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-100">
          <Header slug="Home" navLinks={navLinks} />
          <main>
            <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
              {/* Flexible content area */}
              <div className="px-4 py-6 sm:px-0">{children}</div>
            </div>
          </main>
          <footer className="bg-white">
            <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 justify-end flex">
              {/* Footer content */}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

export default Layout
