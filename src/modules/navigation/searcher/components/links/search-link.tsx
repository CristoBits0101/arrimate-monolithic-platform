'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useSearchContext } from '@/modules/navigation/searcher/hooks/useSearchContext'

interface SearchLinkProps {
  iconSrc: string
}

export default function SearchLink({ iconSrc }: SearchLinkProps) {
  const { searchTerm, updateFocus, updateReset } = useSearchContext()
  const locale = useLocale()
  const term = searchTerm.trim()
  const href = term ? `/${locale}/stories?search=${encodeURIComponent(term)}` : '#'

  const handleClick = () => {
    updateFocus(false)
    updateReset(true)
  }

  return (
    <li className='truncate w-full pr-4 pl-4 pt-1 pb-1 hover:bg-[#F4F4F4] dark:hover:bg-[#26272C] lowercase'>
      <Link
        href={href}
        className='truncate flex gap-2 items-center dark:text-white'
        onClick={handleClick}
      >
        <Image className='w-5' src={iconSrc} alt='Search' />
        {term || 'Data'}
      </Link>
    </li>
  )
}
