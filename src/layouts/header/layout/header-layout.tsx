'use client'

// Branding
import Logo from '@/layouts/header/logotype/branding-logo'

// Components
import SearchContent from '@/modules/navigation/searcher/components/panels/search-content'

// Context
import { useSearchContext } from '@/modules/navigation/searcher/hooks/useSearchContext'

// Navigation
import ReturnSearchEngine from '@/layouts/header/panels/navigation-panel'

// Layout
export default function Header() {
  // Context
  const { searchContainerRef, isFocused } = useSearchContext()

  return !isFocused ? (
    <header className='hidden md:flex md:col-start-1 col-span-1 border-r-[0.05rem] border-[#EBEAEB] dark:border-[#3b3b40] flex-col gap-8 min-h-screen max-h-fit h-auto py-8 sticky top-0 max-w-80'>
      <Logo />
      <ReturnSearchEngine />
    </header>
  ) : (
    <header className='hidden md:flex md:col-start-1 col-span-1 border-r-[0.05rem] border-[#EBEAEB] dark:border-[#3b3b40] flex-col gap-8 min-h-screen max-h-fit h- sticky top-0 max-w-80'>
      <div className='w-full h-full flex' ref={searchContainerRef}>
        <div className='w-fit h-full border-r-[0.05rem] border-[#EBEAEB] dark:border-[#3b3b40] py-8 px-4'>
          <div className='w-fit h-fit mb-8 mx-auto'>
            <Logo />
          </div>
          <ReturnSearchEngine />
        </div>
        <div className='w-full h-full border-0 outline-none'>
          <SearchContent />
        </div>
      </div>
    </header>
  )
}
