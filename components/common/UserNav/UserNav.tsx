import { FC,useContext } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@commerce/types/cart'
import { Avatar } from '@components/common'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import Button from '@components/ui/Button'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import Menu from '@components/icons/Menu'
import { DataStore } from '../../../utils/DataStore';
interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { state, dispatch } = useContext(DataStore);
  const {  customerInfo } = state;

  const {cart} = state;
  const { toggleSidebar, closeSidebarIfPresent, openModal, setSidebarView } =useUI()
  const itemsCount = cart.cartItems.length

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            {customerInfo ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILEMENU_VIEW')
              toggleSidebar()
            }}
            aria-label="Menu"
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
