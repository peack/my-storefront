import { useAuth } from '@/providers/Auth'

export default function ProfileHeader() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to your profile {user?.name ?? ''}
      </p>
    </div>
  )
}
