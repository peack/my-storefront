'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { UserMenu } from '@components/Header/UserMenu'
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
      className={`sticky top-0 z-40 backdrop-blur-[2px] ${
        isScrolled ? 'py-4 px-4 max-w-4xl mx-auto md:max-w-screen ' : ''
      } ease-in-out duration-500 `}
    >
      <div className="max-w-screens mx-auto">
        <div
          className={`container mx-auto flex justify-between items-center shadow bg-white py-2 ${
            isScrolled ? 'max-w-4xl rounded-xl px-4 mx-4' : ''
          } `}
        >
          <NavigationMenu>
            <NavigationMenuList className="">
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
              <UserMenu />
            </div>
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export default Header
