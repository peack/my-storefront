import React from 'react'
import { NavigationMenuLink } from '@components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'

export const HeaderListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={(props.href as Url) ?? ''}
          passHref
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
HeaderListItem.displayName = 'HeaderListItem'
