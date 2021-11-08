import './NavigationTop.scss'
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import pngLogo from '../../../assets/images/png_logo.png'
import CartIcon from '../../../assets/tsx/CartIcon'
import FavoriteIcon from '../../../assets/tsx/FavoriteIcon'
import PersonIcon from '../../../assets/tsx/PersonIcon'
import ButtonNotification from '../../button/notification/ButtonNotification'
import ChevronIcon from '../../../assets/tsx/ChevronIcon'
import { useHistory } from 'react-router'

type Mode = 'static' | 'dynamic'

interface NavigationTopProps {
    navRef?: LegacyRef<HTMLDivElement>
    mode?: Mode,
    className?: string,
    infoItems: Array<{path: string, label: string}>
    shopItems: Array<{title: string, path: string, items: Array<{id: string, label: string}>}>
}

function NavigationTop({ navRef, className, mode = 'static', infoItems, shopItems }: NavigationTopProps) {
    const setCartValueRef: MutableRefObject<((value: string) => void) | null> = useRef(null)
    const setCartCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)
    const setFavoriteCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)
    const homeRef: LegacyRef<HTMLDivElement> = useRef(null)
    const shopRef: LegacyRef<HTMLDivElement> = useRef(null)
    const combedRef: LegacyRef<HTMLDivElement> = useRef(null)
    const catalogRef: LegacyRef<HTMLDivElement> = useRef(null)
    const priceRef: LegacyRef<HTMLDivElement> = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const home = homeRef.current
        const shop = shopRef.current
        const combed = combedRef.current
        const catalog = catalogRef.current
        const price = priceRef.current

        if(home !== null) {
            home.onclick = () => {
                history.push('/')
            }
        }

        if(shop !== null) {
            shop.onclick = () => {
                console.log('shopp')
                history.push('/shop')
            }
        }

        if(combed !== null) {
            combed.onclick = () => {
                history.push('/combed')
            }
        }

        if(catalog !== null) {
            catalog.onclick = () => {
                history.push('/catalog')
            }
        }

        if(price !== null) {
            price.onclick = () => {
                history.push('/price')
            }
        }

    }, [history])

    return (
        <div ref={navRef} className={`navigation-top ${className}`}>
            <div className='navigation-top-container'>
                <img className={`navigation-top-container-logo ${mode === 'static' ? 'hide' : ''}`} alt='' src={pngLogo} />
                <div className='navigation-top-container-menu'>
                    <div ref={homeRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '5.6em'}}>HOME</div>
                    <div className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '7em'}}>
                        <div ref={shopRef} style={{height: '100%', display: 'flex', alignItems: 'center' }}>SHOP</div>
                        <ChevronIcon className='navigation-top-container-menu-chevron' />
                        <div className='navigation-top-container-menu-item-shop'>
                            {shopItems.map((value, index) => <div key={index} className='navigation-top-container-menu-item-shop-item'>
                                <div className='navigation-top-container-menu-item-shop-item-label'>{value.title}</div>
                                <div className='navigation-top-container-menu-item-shop-item-container'>
                                    {value.items.map((v, i) => <div key={i} className='navigation-top-container-menu-item-shop-item-container-item' onClick={(e) => {
                                        history.push(value.path + '/' + v.id)
                                        e.stopPropagation()
                                    }}>{v.label}</div>)}
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div ref={combedRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '6.8em'}}>COMBED</div>
                    <div ref={catalogRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '9.7em'}}>KATALOG KAIN</div>
                    <div ref={priceRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '12.7em'}}>DAFTAR HARGA KAIN</div>
                    <div className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{width: '6.6em', cursor: 'default'}}>
                        <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>INFO</div>
                        <ChevronIcon className='navigation-top-container-menu-chevron' />
                        <div className='navigation-top-container-menu-item-info'>
                            {infoItems.map((value, index) => <div key={index} className='navigation-top-container-menu-item-info-item' onClick={(e) => {
                                history.push(value.path)
                                e.stopPropagation()
                            }} style={{cursor: 'pointer'}}>{value.label}</div>)}
                        </div>
                    </div>
                </div>
                <div className={`navigation-top-container-profile ${mode === 'static' ? 'hide' : ''}`}>
                    <ButtonNotification icon={PersonIcon} showCounter={false} showTitle={false} />
                    <ButtonNotification icon={FavoriteIcon} showTitle={false} count={25} setCountRef={setFavoriteCountRef} />
                    <ButtonNotification icon={CartIcon} count={1000} titleLabel='Cart' titleValue='Rp0.00' setCountRef={setCartCountRef} setValueRef={setCartValueRef} />
                </div>
            </div>
        </div>
    )
}

export default NavigationTop
