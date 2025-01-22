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
    defaultValues: {
      name: 'Cristo',
      email: '',
      password: '23123123'
    },
    mode: 'onSubmit'
  })

  // Handlers
  const onSubmit = (values: Record<string, any>) => {
    setError('')
    setSuccess('')
    console.log('Submitted Values:', values)
    startTransition(() => {
      console.log('Start transition')
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
