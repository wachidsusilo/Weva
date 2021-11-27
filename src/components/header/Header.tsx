import './Header.scss'
import pngLogo from '../../assets/images/png_logo.png'
import SearchBar from '../search/SearchBar'
import PersonIcon from '../../assets/tsx/PersonIcon'
import FavoriteIcon from '../../assets/tsx/FavoriteIcon'
import CartIcon from '../../assets/tsx/CartIcon'
import ButtonNotification from '../button/notification/ButtonNotification'
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import NavigationTop from '../navigation/top/NavigationTop'
import { INFO_ITEMS, MENU_ITEMS, SHOP_ITEMS } from '../../constants/constant'
import MenuIcon from '../../assets/tsx/MenuIcon'

interface HeaderProps {
    searchCallback?: (query: string) => void,
}

function Header({ searchCallback }: HeaderProps) {
    const bodyRef: LegacyRef<HTMLDivElement> = useRef(null)
    const floatingRef: LegacyRef<HTMLDivElement> = useRef(null)
    const setCartValueRef: MutableRefObject<((value: string) => void) | null> = useRef(null)
    const setCartCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)
    const setFavoriteCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)

    useEffect(() => {
        const body = bodyRef.current
        const floating = floatingRef.current

        const setFavoriteCount = setFavoriteCountRef.current
        if (setFavoriteCount !== null) {
            setFavoriteCount(31)
        }

        window.onscroll = () => {
            if (body !== null && floating !== null) {
                const rect = body.getBoundingClientRect()
                if (rect.y <= -191) {
                    if (!floating.classList.contains('header-floating-show')) {
                        floating.classList.add('header-floating-show')
                    }
                } else {
                    if (floating.classList.contains('header-floating-show')) {
                        floating.classList.remove('header-floating-show')
                    }
                }
            }
        }
    })

    return (
        <div ref={bodyRef} className='header'>
            <div className='header-top'>
                <div className='header-top-container'>
                    <div className='header-top-container-whatsapp'>WHATSAPP KAMI</div>
                    <div className='header-top-container-location'>JL. KAPASAN NO.55 B SURABAYA</div>
                </div>
            </div>
            <div className='header-middle'>
                <div className='header-middle-app'>
                    <MenuIcon classContainer='header-middle-app-menu' />
                    <img className='header-middle-app-logo' alt='' src={pngLogo} />
                </div>
                <SearchBar className='header-middle-search' searchCallback={searchCallback} menuItems={MENU_ITEMS} />
                <div className='header-middle-account'>
                    <ButtonNotification icon={PersonIcon} showCounter={false} showTitle={false} />
                    <ButtonNotification icon={FavoriteIcon} showTitle={false} count={25} setCountRef={setFavoriteCountRef} />
                    <ButtonNotification icon={CartIcon} count={1000} titleLabel='Cart' titleValue='Rp0.00' setCountRef={setCartCountRef} setValueRef={setCartValueRef} />
                </div>
            </div>
            <NavigationTop className='header-navigation' mode='static' shopItems={SHOP_ITEMS} infoItems={INFO_ITEMS} />
            <NavigationTop navRef={floatingRef} className='header-floating' mode='dynamic' shopItems={SHOP_ITEMS} infoItems={INFO_ITEMS} />
        </div>
    )
}

export default Header
