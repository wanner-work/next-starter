import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get('locale')?.value || 'de'

  const messages = {
    ...(await import(`../features/homeHero/i18n/${locale}.json`)).default,
  }

  return {
    locale,
    messages
  }
})
