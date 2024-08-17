'use client'

import React from 'react'
import { AuthProvider } from './Auth'
import { Toaster } from '@/components/ui/toaster'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
