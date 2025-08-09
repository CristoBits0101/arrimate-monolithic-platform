'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { BaseSyntheticEvent } from 'react'
import { usePathname } from 'next/navigation'

import { useSettingsForm } from '@/modules/configuration/profile-update/hooks/useSettingsForm'
import type { UseFormReturn } from 'react-hook-form'

interface SettingsFormContextType {
  form: UseFormReturn<any>
  status: 'idle' | 'dirty' | 'success' | 'error'
  isPending: boolean
  handleUpdate: (event?: BaseSyntheticEvent) => void
}

const SettingsFormContext = createContext<SettingsFormContextType | null>(null)

export function SettingsFormProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isSettings = path?.includes('/settings')

  const { form, error, success, isPending, hydrated, onSubmit } =
    useSettingsForm(isSettings)

  const [status, setStatus] = useState<'idle' | 'dirty' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!isSettings) return
    const subscription = form.watch(() => {
      setStatus(form.formState.isDirty ? 'dirty' : 'idle')
    })
    return () => subscription.unsubscribe()
  }, [form, isSettings])

  useEffect(() => {
    if (!isSettings || !success) return
    setStatus('success')
    const timeout = setTimeout(() => setStatus('idle'), 3000)
    return () => clearTimeout(timeout)
  }, [success, isSettings])

  useEffect(() => {
    if (!isSettings || !error) return
    setStatus('error')
    const timeout = setTimeout(
      () => setStatus(form.formState.isDirty ? 'dirty' : 'idle'),
      3000
    )
    return () => clearTimeout(timeout)
  }, [error, form, isSettings])

  const handleUpdate = (event?: BaseSyntheticEvent) => {
    form.handleSubmit(onSubmit)(event)
  }

  if (!isSettings) return <>{children}</>

  return (
    <SettingsFormContext.Provider value={{ form, status, isPending, handleUpdate }}>
      {hydrated ? children : null}
    </SettingsFormContext.Provider>
  )
}

export function useSettingsFormContext() {
  const context = useContext(SettingsFormContext)
  if (!context) {
    throw new Error('useSettingsFormContext must be used within SettingsFormProvider')
  }
  return context
}
