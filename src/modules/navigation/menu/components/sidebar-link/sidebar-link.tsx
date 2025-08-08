'use client'

// Custom
import { usePageIcon } from '@/modules/navigation/menu/hooks/useIcon'

// Image
import Image from 'next/image'

// Intl
import { useLocale, useTranslations } from 'next-intl'

// Next
import Link from 'next/link'

// Type props
interface NavigationItemProps {
  route: string
  blackIcon: string
  whiteIcon: string
  textKey?: string
}

export default function SidebarItem({
  route,
  blackIcon,
  whiteIcon,
  textKey
}: NavigationItemProps) {
  // Send the route to the hook
  const isActive = usePageIcon(route)

  // Get locale language
  const locale = useLocale()

  // Get translations
  const t = useTranslations('SidebarLayout')

  // Create href path
  const href = route === 'stories' ? `/${locale}` : `/${locale}/${route}`

  // Return the link
  return (
    // List element
    <li className='flex items-center justify-center w-fit h-fit hover:cursor-pointer'>
      {/* Link */}
      <Link
        className='flex items-center justify-center h-fit w-fit p-2 rounded-full transition-colors duration-300 hover:bg-[#F4F4F4] dark:hover:bg-[#848489] dark:text-[#ecece]'
        href={href}
        onClick={() => {
          const audio = new Audio('/sounds/click.mp3')
          audio.play()
        }}
      >
        {/* Image */}
        <Image
          className='w-7 h-7 object-contain aspect-square'
          src={isActive ? blackIcon : whiteIcon}
          alt={route}
        />
        {textKey && t(textKey)}
      </Link>
    </li>
  )
}
