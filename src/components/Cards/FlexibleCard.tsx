import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'

interface FlexibleCardProps {
  children: React.ReactNode
  title?: string
  footer?: React.ReactComponentElement<React.FC, null>
}
export default function FlexibleCard({ children, title, footer }: FlexibleCardProps) {
  return (
    <Card>
      {title ? (
        <CardHeader>
          <h2 className="text-xl font-bold">{title}</h2>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  )
}
