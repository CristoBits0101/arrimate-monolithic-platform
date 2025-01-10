'use client'

// Components
import SearchLink from '@/modules/navigation/searcher/components/search-link'

// Icons
import clear from '@/assets/icons/buttons/inactive/light-theme/windows/clear-light-icon.svg'
import close from '@/assets/icons/buttons/inactive/light-theme/windows/close-light-icon.svg'
import searchIcon from '@/assets/icons/buttons/inactive/light-theme/searcher/search-light-icon.svg'

// Image
import Image from 'next/image'

// Intl
import { useTranslations } from 'next-intl'

// Types
type SetIsFocused = React.Dispatch<React.SetStateAction<boolean>>
type SetResetSearchInput = React.Dispatch<React.SetStateAction<boolean>>

// Type props
interface SearchContentProps {
  setResetSearchInput: SetResetSearchInput
  setIsFocused: SetIsFocused
  searchTerm: string
  locale: string
}

export default function SearchRecommended({
  setResetSearchInput,
  setIsFocused
}: // searchTerm,
// locale
SearchContentProps) {
  const t = useTranslations('Searcher')
  const handleFocus = () => {
    setIsFocused(false)
  }
  const handleClearSearch = () => {
    setResetSearchInput(true)
  }
  return (
    <nav className='rounded-3xl mt-2 pt-4 pb-3 border-[0.05rem] border-solid border-[#EBEAEB] shadow-sm w-full h-fit flex flex-col gap-3'>
      <div className='font-medium pr-4 pl-4 w-full h-fit flex justify-between items-center'>
        <h2>{t('recommended')}</h2>
        <div className='w-fit h-full flex gap-2 items-center justify-center'>
          <button onClick={handleClearSearch}>
            <Image className='w-4' src={clear} alt='Close' />
          </button>
          <button onClick={handleFocus}>
            <Image className='w-4' src={close} alt='Close' />
          </button>
        </div>
      </div>
      <ul className='flex flex-col w-full h-fit'>
        <SearchLink iconSrc={searchIcon} />
      </ul>
    </nav>
  )
}
