'use client'
import React, { Suspense } from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import dynamic from 'next/dynamic'
import { UserMenu } from '@components/Header/UserMenu'
interface HeaderProps {
  slug: string
  navLinks: string[]
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  return (
    <header>
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto flex justify-between items-center shadow bg-white  rounded-lg py-2">
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
