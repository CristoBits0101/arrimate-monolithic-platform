import cartBlackSVG from '@/assets/icons/sidebar/black/cart.svg'
import cartWhiteSVG from '@/assets/icons/sidebar/white/cart.svg'
import NavigationItem from '@/modules/navigation/components/links/sidebar-link'

export default function Cart() {
  return (
    <NavigationItem
      route='cart'
      blackIcon={cartBlackSVG}
      whiteIcon={cartWhiteSVG}
    />
  )
}
