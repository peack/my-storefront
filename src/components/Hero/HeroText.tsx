import React from 'react'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface HeroTextProps {
  title: string
  subtitle: string
  backgroundImage: string
  cardTitle: string
  cardDescription: string
  cardContent: string
  overlayColor?: string
  className?: string
}

const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  backgroundImage,
  cardTitle,
  cardDescription,
  cardContent,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  className = '',
}) => {
  return (
    <section className={cn('pb-20', className)}>
      <div className="relative z-20 w-full  min-h-[50vh] h-[60vh] flex items-end justify-center">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor }}></div>
        </div>
      </div>

      <div className="relative z-20  w-full max-w-4xl px-4 mx-auto items-end">
        <Card className="my-[-30px] mx-auto bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">{cardTitle}</CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-500">
              {cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{cardContent}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default HeroText
