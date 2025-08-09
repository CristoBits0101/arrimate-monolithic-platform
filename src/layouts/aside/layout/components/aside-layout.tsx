'use client'

// Hooks
import { usePageComponent } from '@/layouts/aside/layout/hooks/useAsidePanel'

// Navigation
import Sidebar from '@/modules/navigation/menu/components/sidebar-menu/sidebar-menu'

// Styles
import styles from '@/layouts/aside/layout/styles/aside.module.css'

// Layout
export default function Aside() {
  const component = usePageComponent() || null
  return (
    <aside
      className={`hidden md:flex md:col-start-3 col-span-1 flex-col h-screen py-8 pr-8 sticky top-0 overflow-y-auto max-w-80 gap-8 ${styles.noScrollbar}`}
    >
      <Sidebar />
      {component && component}
    </aside>
  )
}
