// Components
import RecentContent from '@/modules/navigation/searcher/components/results/search-recent'
import RecommendedContent from '@/modules/navigation/searcher/components/results/search-recommended'

// Fonts
import { ds } from '@/lib/google/google-fonts'

// Hook
import { useSearchContext } from '@/modules/navigation/searcher/hooks/useSearchContext'

// Intl
import SearchForm from '../forms/search-form'

export default function SearchContent() {
  // Context
  const { searchTerm } = useSearchContext()

  return (
    <div className='w-full h-full py-8 grid grid-rows-[44px,1fr] gap-8'>
      <div className='w-full h-11 px-4 flex items-center'>
        <h1 className={`${ds.className} text-4xl font-medium text-center w-full`}>Arrímate</h1>
      </div>
      <div className='w-full h-full flex flex-col gap-8'>
        <SearchForm />
        {searchTerm ? <RecommendedContent /> : <RecentContent />}
      </div>
    </div>
  )
}
