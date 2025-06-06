// Spinners
import { PulseLoader } from 'react-spinners'

// Shadcn
import { Button } from '@/modules/ui/button'

// Types props
interface SubmitButtonProps {
  message?: string
  isPending: boolean
}

export default function SubmitButton({
  message,
  isPending
}: SubmitButtonProps) {
  return (
    <Button
      // Disabled if pending
      disabled={isPending}
      // Button type is submit
      type='submit'
      // Styling for the button
      className='w-24 rounded-full dark:bg-[#848489] bg-[#453C41] dark:hover:bg-[#b8b8bb] hover:bg-[#1d0f0f] text-[#FFFFFF] dark:text-[#1B1A1F] shadow-sm flex items-center justify-center'
    >
      {/* Shows loader if pending, otherwise message */}
      {isPending ? <PulseLoader /> : message}
    </Button>
  )
}
