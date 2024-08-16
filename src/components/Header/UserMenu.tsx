import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu'
import { HeaderListItem } from '@/components/Header/HeaderListItem'
import { useAuth } from '@/providers/Auth'

export function UserMenu() {
  const { user } = useAuth()

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem key={user?.name}>
            <NavigationMenuTrigger>
              {user ? user?.name ?? user.email : 'Login / Signup'}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2  p-6 md:w-[120px] ]">
                <HeaderListItem
                  key={user?.id}
                  title={user?.name ? 'Profile' : 'Login'}
                  href={user ? '/profile' : '/login'}
                />
                {!user && <HeaderListItem title="Signup" href="/signup" />}
                {user?.roles?.includes('admin') && <HeaderListItem title="Dash" href="/admin" />}
                {user && <HeaderListItem title="Logout" href="/logout" />}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
