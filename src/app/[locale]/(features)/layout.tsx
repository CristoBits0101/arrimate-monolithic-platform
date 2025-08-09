// Layouts
import Aside from '@/layouts/aside/layout/components/aside-layout'
import Header from '@/layouts/header/layout/header-layout'
import { SettingsFormProvider } from '@/modules/configuration/profile-update/contexts/settings-form-context'

export default function FeaturesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsFormProvider>
      {/* Header layout */}
      <Header />
      {/* Features pages */}
      <main className='min-w-52 min-h-screen max-h-fit h-auto col-span-1 md:col-start-2'>
        {children}
      </main>
      {/* Aside layout  */}
      <Aside />
    </SettingsFormProvider>
  )
}
