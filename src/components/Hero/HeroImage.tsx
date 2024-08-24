import Image from 'next/image'
import { cn } from '@/lib/utils'
import HeroButton from './HeroButton'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
  overlayColor?: string
  className?: string
}

const HeroImage: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  className = '',
}) => {
  return (
    <section
      className={cn(
        'relative w-full min-h-[50vh] h-[calc(50dvh)] flex items-center justify-center',
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative inset-0" style={{ backgroundColor: overlayColor }}></div>
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
        <HeroButton ctaLink={ctaLink} ctaText={ctaText} />
      </div>
    </section>
  )
}

export default HeroImage
