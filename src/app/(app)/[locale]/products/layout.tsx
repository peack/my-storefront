import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
}
