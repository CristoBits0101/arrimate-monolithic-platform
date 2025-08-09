'use client'

// Components
import ShowPostShorts from '@/modules/publications/show-post/components/posts/show-post-shorts'

// Styles
import '@/styles/globals.css'

export default function ShortsPage() {
  return (
    <>
      <ShowPostShorts />
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

