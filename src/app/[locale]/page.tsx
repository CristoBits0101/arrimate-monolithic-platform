'use client'

// Components
import ShowPostImages from '@/modules/publications/show-post/components/posts/show-post-images'
import ShowPostStories from '@/modules/publications/show-post/components/posts/show-post-stories'

// Layouts
import Header from '@/layouts/header/layout/header-layout'
import Aside from '@/layouts/aside/layout/components/aside-layout'

// Styles
import '@/styles/globals.css'

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className='hidden md:flex md:col-start-2 min-w-[46rem] min-h-screen max-h-fit h-auto col-span-1 flex-col items-center gap-16'>
        <ShowPostStories />
        <ShowPostImages />
      </main>
      <Aside />
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
