'use client'
import { Button } from '@components/ui/button'
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')

  const changeLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 7}; secure;`
    // setTimeout(() => window.document.location.reload(), 1500)
  }
  const currentLocale = useLocale()

  return (
    <div className="flex">
      <Button
        variant={'link'}
        className={currentLocale === 'fr' ? 'font-bold' : ''}
        onClick={() => {
          changeLocale('fr')
        }}
      >
        {t('localeSwitcher_french_label')}
      </Button>
      <Button
        variant={'link'}
        className={currentLocale === 'en' ? 'font-bold' : ''}
        onClick={() => {
          changeLocale('en')
        }}
      >
        {t('localeSwitcher_english_label')}
      </Button>
    </div>
  )
}
