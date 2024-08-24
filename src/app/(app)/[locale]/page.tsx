import { Badge } from '@/components/Badge'
import { Background } from '@/components/Background'
import Link from 'next/link'
import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import HeroImage from '@/components/Hero/HeroImage'
import HeroText from '@/components/Hero/HeroText'

interface PageProps {
  params: {
    locale: string
  }
}
const Page = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale)

  return (
    <>
      <div className="">
        <HeroImage
          title={'Home Page Test one'}
          subtitle={'This is the home page Hero 1 for test'}
          ctaText={'Explore our products!'}
          ctaLink={'/products'}
          backgroundImage={'/img/multicolor-textile.jpg'}
          className="h-[calc(75dvh)] md:h-[calc(90dvh)]"
        />

        <HeroText
          title={'Our promise'}
          subtitle={'This is the hero subtitle'}
          backgroundImage={'/img/threads.jpg'}
          cardTitle={'Our promise to you!'}
          cardDescription={'Our promise'}
          cardContent={
            'This is a description of the card content for the hero with much longer text capacity'
          }
          className="relative z-0"
        />
      </div>
    </>
  )
}

export default Page

const oldHomeArticle = (
  <article>
    <Badge />
    <h1>Payload 3.0</h1>
    <p>
      This BETA is rapidly evolving, you can report any bugs against{' '}
      <Link href="https://github.com/payloadcms/payload-3.0-demo/issues" target="_blank">
        the repo
      </Link>{' '}
      or in the{' '}
      <Link
        href="https://discord.com/channels/967097582721572934/1215659716538273832"
        target="_blank"
      >
        dedicated channel in Discord
      </Link>
      . Payload is running at <Link href="/admin">/admin</Link>. An example of a custom route
      running the Local API can be found at <Link href="/my-route">/my-route</Link>.
    </p>
    <p>You can use the Local API in your server components like this:</p>
  </article>
)
