// Auth
import { SessionProvider } from 'next-auth/react'

// Context
import { PostProvider } from '@/modules/publications/add-post/contexts/PostContext'
import { SearchProvider } from '@/modules/navigation/searcher/context/SearchContext'
import { ThemeProvider } from '@/modules/configuration/settings-panel/contexts/ThemeContext'

// Fonts
import { figtree } from '@/lib/google/google-fonts'

// Intl
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

// Next
import type { Metadata } from 'next'

// Styles
import '@/styles/globals.css'

// Metadata
export const metadata: Metadata = {
  title: 'Arrímate',
  description: '',
  icons: {
    icon: '/ico/arrimate.ico'
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Params
  const { locale } = await params
  // JSON
  const messages = await getMessages()
  return (
    // HTML
    <html lang={locale} data-mode=''>
      {/* Body */}
      <body
        className={`${figtree.className} grid sm:place-content-center sm:grid-cols-[100%] md:grid-cols-[20rem_1fr_20rem] min-h-screen max-h-fit h-auto min-w-80 w-full bg-[#ffffff] dark:bg-[#1B1A1F] text-[#1d0f0f] dark:text-[#ececed] text-base`}
      >
        {/* Providers */}
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <SearchProvider>
              <PostProvider>
                <ThemeProvider>
                  {/* Pages */}
                  {children}
                </ThemeProvider>
              </PostProvider>
            </SearchProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
