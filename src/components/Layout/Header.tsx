'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import ThreadLogo from '/public/icons/Thread_logo.svg'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { UserMenu } from '@components/Header/UserMenu'
import ProductSearchWrapper from '@/components/Search/ProductSearchWrapper'
import Image from 'next/image'
interface HeaderProps {
  slug: string
  navLinks: string[]
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 60) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-[2px]  ${
        isScrolled ? 'py-2 px-2 max-w-4xl mx-auto md:max-w-screen ' : ''
      } ease-in-out duration-700 `}
    >
      <div className="max-w-screen mx-auto">
        <div
          className={`container max-w-[100vw] mx-auto sm:px-8 flex justify-between items-center shadow bg-white py-1 ${
            isScrolled ? 'max-w-4xl rounded-xl m-1 ' : ''
          } `}
        >
          <NavigationMenu>
            <NavigationMenuList className="space-x-0">
              <NavigationMenuItem className="p-0">
                <Link href="/" className="">
                  <Image src={'/icons/Thread_logo.svg'} alt="Thread" width={40} height={40} />
                </Link>
              </NavigationMenuItem>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link} className={navigationMenuTriggerStyle()}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase() || ''}`}
                    className={
                      navigationMenuTriggerStyle() + link === 'Admin' ? 'flex-row-reverse' : 'aa'
                    }
                  >
                    {link}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Suspense>
            <div className="flex items-center">
              {/* Search here */}
              <ProductSearchWrapper />
              <UserMenu />
            </div>
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export default Header
