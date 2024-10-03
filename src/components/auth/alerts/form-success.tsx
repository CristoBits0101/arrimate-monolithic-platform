import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
  message?: string
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null
  return (
    <div className='bg-emerald-500/15 p-3 rounded-none flex items-center gap-x-2 text-xs text-emerald-500'>
      <CheckCircledIcon className='h-5 w-5' />
      {message}
    </div>
  )
}
