'use client'

import React from 'react'
import { AuthProvider } from './Auth'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}
