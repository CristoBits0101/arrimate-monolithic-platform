import videosBlackSVG from '@/assets/icons/navbar/black/videos.svg'
import videosWhiteSVG from '@/assets/icons/navbar/white/videos.svg'
import NavigationItem from '@/components/navigation/links/navbar-link'

export default function Videos() {
  return (
    <NavigationItem
      route='videos'
      blackIcon={videosBlackSVG}
      whiteIcon={videosWhiteSVG}
      textKey='videos'
    />
  )
}
