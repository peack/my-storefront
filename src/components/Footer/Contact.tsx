import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <>
      <div className="flex-col items-end ">
        <div>
          Phone:
          <Link href="tel:+1(555)555-5555">
            <Button variant={'link'}>555-555-5555</Button>
          </Link>
        </div>
        <div>
          Email:
          <Link href="mailto:0sHqZ@example.com">
            <Button variant={'link'}>0sHqZ@example.com</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
