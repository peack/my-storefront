import LocaleSwitcher from '@components/Footer/LocaleSwitcher'
import Contact from '@components/Footer/Contact'

export default async function Footer() {
  return (
    <div className="w-screen p-2 sm:px-6 lg:px-8 shadow bg-white ">
      <div className="container flex justify-end ">
        <div className="flex-col items-baseline">
          <LocaleSwitcher />
          <Contact />
        </div>
      </div>
    </div>
  )
}
