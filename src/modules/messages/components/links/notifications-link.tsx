import notificationsBlackSVG from '@/assets/icons/sidebar/black/notifications.svg'
import notificationsWhiteSVG from '@/assets/icons/sidebar/white/notifications.svg'
import NavigationItem from '@/modules/navigation/components/links/sidebar-link'

export default function Notifications() {
  return (
    <NavigationItem
      route='notifications'
      blackIcon={notificationsBlackSVG}
      whiteIcon={notificationsWhiteSVG}
    />
  )
}
