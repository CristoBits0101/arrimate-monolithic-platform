'use client'

// Actions: Encapsulates backend logic
import resetPasswordAction from '@/modules/auth/reset-password/actions/reset-password-action'

// Intl: To get language and set translations
import { useLocale, useTranslations } from 'next-intl'

// React: Hooks from React
import { useEffect, useState, useTransition } from 'react'

// Form: Manage form status and validation
import { useForm } from 'react-hook-form'

// Zod: Schema validation for the form
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordSchema } from '@/modules/auth/reset-password/schemas'

// Hook: Encapsulates logic for reset password functionality
export const useResetPassword = () => {
  // States: Manage error, success messages, and pending state
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  // Hydration: Ensure client-side rendering
  const [hydrated, setHydrated] = useState(false)

  // Navigation: Get locale for redirection
  const locale = useLocale()

  // Translations: Access translations for forms and email subject
  const t = useTranslations('AuthActions')
  const f = useTranslations('Forms')
  const m = useTranslations('Mail')
  const subject = m('subject')

  // Form: Initialize with schema validation
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  })

  // Form submission logic
  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      resetPasswordAction(values, subject ?? 'reset')
        .then((data) => {
          setError(t(data?.error))
          setSuccess(t(data?.success))
          if (data.success) window.location.href = `/${locale}`
        })
        .catch((error) => {
          console.error('Error during password reset:', error)
          setError('An unexpected error occurred.')
        })
    })
  }

  // Backend finished allowing frontend to render
  useEffect(() => setHydrated(true), [])

  return { form, error, success, isPending, hydrated, f, onSubmit, locale }
}
