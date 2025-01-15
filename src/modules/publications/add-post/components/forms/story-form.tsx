'use client'

// Buttons
import SubmitButton from '@/modules/publications/create-post/components/buttons/submit-button'

// Components
import CardWrapper from '@/modules/publications/create-post/components/cards/card-wrapper'

// Hooks
import { useState, useTransition } from 'react'

// Intl
import { useTranslations } from 'next-intl'

export default function StoryForm() {
  // State for uploaded file
  const [file, setFile] = useState<File | null>(null)
  // Translations
  const t = useTranslations('FeedForms')
  // Transition state
  const [isPending, startTransition] = useTransition()

  // Submit logic
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    e.preventDefault()
    // Start transition
    startTransition(async () => {
      // Create new instance of FormData
      const formData = new FormData(e.currentTarget)
      // Add file to form data
      formData.append('file', file as Blob)
      // Send form data to server
      const response = await fetch('/api/stories', {
        method: 'POST',
        body: formData
      })
      // Get the response data from server
      const data = await response.json()
      if (data) console.log(data)
    })
  }

  // Return component
  return (
    <CardWrapper headerTitle={t('stories')}>
      <form
        encType='multipart/form-data'
        onSubmit={onSubmit}
        className='flex flex-col gap-4'
      >
        <input
          type='file'
          name='file'
          onChange={(e) => {
            // Get the file from the input
            const file = e.target.files?.[0]
            // Set the file in state
            if (file) setFile(file)
          }}
          accept='image/*'
        />
        <SubmitButton isPending={isPending} />
      </form>
    </CardWrapper>
  )
}
