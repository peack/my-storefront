import React from 'react'
import Verify from './Verify'

interface verifyProps {
  params: { locale: string }
  searchParams: { token: string }
}

export default function page({ searchParams }: verifyProps) {
  return <Verify token={searchParams.token} />
}
