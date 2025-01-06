'use client'

// Custom hook
import useThemeSection from '@/modules/configuration/hooks/sections/useThemeSection'

// Layouts
import Header from '@/layouts/components/header'
import Aside from '@/layouts/components/aside'

// Posts
import ShowPostImages from '@/modules/feeds/components/posts/show-post-images'
import ShowPostStories from '@/modules/feeds/components/posts/show-post-stories'

// Styles
import '@/styles/globals.css'

export default function StoriesPage() {
  const { getTheme } = useThemeSection()
  getTheme()
  return (
    <>
      {/* Header layout */}
      <Header />
      {/* Stories page content */}
      <main className='hidden md:flex min-w-[46rem] min-h-screen max-h-fit h-auto col-span-1 flex-col items-center gap-16 dark:bg-[#26272C]'>
        <ShowPostStories />
        <ShowPostImages />
      </main>
      {/* Aside layout */}
      <Aside />
      {/* Mobile view message */}
      <div className='sm:grid md:hidden place-content-center w-full h-full'>
        <h1 className='w-fit m-auto'>
          🚧 Mobile version coming soon!
          <br />
          🚧 ¡Versión para móviles próximamente!
        </h1>
      </div>
    </>
  )
}
