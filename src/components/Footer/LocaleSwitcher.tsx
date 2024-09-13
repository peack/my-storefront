'use client'
import { Button } from '@components/ui/button'
import { useLocale, useTranslations } from 'next-intl'
import { Separator } from '@components/ui/separator'
import { usePathname, useRouter, type Locale } from '@/i18.config'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (locale: Locale) => {
    router.replace(pathname, { locale: locale })
  }
  const currentLocale = useLocale() as Locale

  return (
    <div className="flex justify-end ">
      <Button
        variant={'link'}
        className={currentLocale === 'fr' ? 'font-bold' : ''}
        onClick={() => {
          changeLocale('fr' as Locale)
        }}
      >
        {t('localeSwitcher_french_label')}
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant={'link'}
        className={currentLocale === 'en' ? 'font-bold' : ''}
        onClick={() => {
          changeLocale('en' as Locale)
        }}
      >
        {t('localeSwitcher_english_label')}
      </Button>
    </div>
  )
}
