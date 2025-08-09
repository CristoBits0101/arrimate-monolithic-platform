import { IoIosHeart } from 'react-icons/io'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import { MdOutlineBookmark } from 'react-icons/md'
import { RiShareForwardFill } from 'react-icons/ri'
import { SlOptionsVertical } from 'react-icons/sl'

interface PostButtonProps {
  textDisplay?: string
  iconDisplay: string
  iconColor?: string
  iconAlt: string
  iconSize?: number
  onClick?: () => void
  isActive?: boolean
}

export default function PostButton({
  textDisplay = '',
  iconDisplay = '',
  iconColor = '#1D0F0F',
  iconAlt = '',
  iconSize = 28,
  onClick,
  isActive = false
}: PostButtonProps) {
  // Calculate the text that will be displayed
  const likes = parseInt(textDisplay, 10)
  if (likes >= 1_000 && likes < 1_000_000)
    textDisplay = (likes / 1_000).toFixed(1) + ' K'
  else if (likes >= 1_000_000 && likes < 1_000_000_000)
    textDisplay = (likes / 1_000_000).toFixed(1) + ' M'
  else if (likes >= 1_000_000_000)
    textDisplay = (likes / 1_000_000_000).toFixed(1) + ' B'
  return (
    <div className='w-fit h-fit flex flex-col gap-2 justify-center items-center'>
      <button
        onClick={onClick}
        className='w-fit h-fit p-3 rounded-full bg-[#F4F4F4] hover:bg-[#EBEAEB] dark:bg-[#848489] dark:hover:bg-[#b8b8bb] dark:text-[#ececed]'
      >
        {iconDisplay === 'like' && (
          <IoIosHeart
            className='drop-shadow-sm w-7 h-7'
            size={iconSize}
            aria-label={iconAlt}
            color={isActive ? '#932D30' : iconColor}
          />
        )}
        {iconDisplay === 'comments' && (
          <IoChatbubbleEllipsesSharp
            className='drop-shadow-sm opacity-85 w-7 h-7'
            size={iconSize}
            aria-label={iconAlt}
            color={iconColor}
          />
        )}
        {iconDisplay === 'save' && (
          <MdOutlineBookmark
            className='drop-shadow-sm opacity-85 w-7 h-7'
            size={iconSize}
            aria-label={iconAlt}
            color={iconColor}
          />
        )}
        {iconDisplay === 'share' && (
          <RiShareForwardFill
            className='drop-shadow-sm opacity-85 w-7 h-7'
            size={iconSize}
            aria-label={iconAlt}
            color={iconColor}
          />
        )}
        {iconDisplay === 'options' && (
          <SlOptionsVertical
            className='drop-shadow-sm opacity-85 w-7 h-7'
            size={iconSize}
            aria-label={iconAlt}
            color={iconColor}
          />
        )}
      </button>
      <span className='text-sm font-medium dark:text-[#ececed]'>
        {textDisplay}
      </span>
    </div>
  )
}
