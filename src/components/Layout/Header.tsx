'use client'
import React from 'react'
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
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList className="">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link}>
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
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
