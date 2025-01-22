'use client'

// Hooks
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function useSettingsForm() {
  // States
  const [error, setError] = useState<string | undefined>('')
  const [hydrated, setHydrated] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm({
    mode: 'onSubmit'
  })

  // Handlers
  const onSubmit = (values: Record<string, any>) => {
    setError('')
    setSuccess('')
    console.log('Submitted Values:', values)
    startTransition(() => {
      alert('Hola')
    })
  }

  // Effects
  useEffect(() => setHydrated(true), [])

  return {
    form,
    error,
    success,
    isPending,
    hydrated,
    onSubmit
  }
}
