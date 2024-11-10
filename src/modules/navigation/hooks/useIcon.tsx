import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

export function usePageIcon(route: string) {
  const path = usePathname()
  const locale = useLocale()
  if (route === 'home') return path === `/${locale}`
  return path === `/${locale}/${route}`
}
