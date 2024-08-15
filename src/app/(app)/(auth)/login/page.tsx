import dynamic from 'next/dynamic'

const MyLogin = dynamic(() => import('./LoginForm'), { ssr: false })

export default async function Login() {
  return (
    <>
      <MyLogin />
    </>
  )
}
