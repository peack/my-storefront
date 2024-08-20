'use client'
import { Button } from '@components/ui/button'
import { useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')

  const changeLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 7}; secure;`

    // setTimeout(() => window.document.location.reload(), 1500)
  }
  return (
    <div className="flex gap-1">
      <Button
        variant={'link'}
        onClick={() => {
          changeLocale('fr')
        }}
      >
        {t('localeSwitcher_french_label')}
      </Button>
      <Button
        variant={'link'}
        onClick={() => {
          changeLocale('en')
        }}
      >
        {t('localeSwitcher_english_label')}
      </Button>
    </div>
  )
}
