import React from 'react'
import ResetPassword from './ResetPassword'

interface resetProps {
  searchParams: { token: string }
}
export default function page({ searchParams }: resetProps) {
  return <ResetPassword token={searchParams.token} />
}
