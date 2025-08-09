'use client'

// Hooks
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

// Actions
import profileAction from '@/modules/configuration/profile-update/actions/user-profile-action'
import getUserProfileAction from '@/modules/configuration/profile-update/actions/get-user-profile-action'

export function useSettingsForm() {
  // States
  const [error, setError] = useState<string | undefined>('')
  const [hydrated, setHydrated] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm({
    defaultValues: {
      name: '',
      nickname: '',
      gender: '',
      birthdate: '',
      phonePrefix: '',
      phoneNumber: '',
      email: '',
      password: '',
      newPassword: '',
      zipCode: '',
      country: '',
      city: '',
      address: '',
      occupation: '',
      interests: '',
      slogan: '',
      portfolio: ''
    },
    mode: 'onSubmit'
  })

  // Handlers
  const onSubmit = (values: Record<string, any>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      profileAction(values).then((data) => {
        if (data?.error) setError(data.error)
        if (data?.success) setSuccess(data.success)
      })
    })
  }

  // Effects
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfileAction()
        if (data) form.reset(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setHydrated(true)
      }
    })()
  }, [form])

  return {
    form,
    error,
    success,
    isPending,
    hydrated,
    onSubmit
  }
}
