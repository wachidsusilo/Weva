import './SearchBar.scss'
import icChevron from '../../assets/svg/ic_chevron.svg'
import icSearch from '../../assets/svg/ic_search.svg'
import { LegacyRef, useEffect, useRef, useState } from 'react'
import { useBinder } from '../../utilities/binder'
import { FIELD_BINDER } from '../../constants/constant'

interface SearchBarProps {
    searchCallback?: (query: string) => void,
    menuItems: Array<string>
}

function SearchBar({ searchCallback, menuItems }: SearchBarProps) {
    const [selectedItem, setSelectedItem] = useState<string>(menuItems[0])
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const categoriesRef: LegacyRef<HTMLDivElement> = useRef(null)
    const inputRef: LegacyRef<HTMLInputElement> = useRef(null)
    const buttonRef: LegacyRef<HTMLDivElement> = useRef(null)
    const categoriesBinder = useBinder(FIELD_BINDER, setShowMenu, true)

    useEffect(() => {
        const categories = categoriesRef.current
        const input = inputRef.current
        const button = buttonRef.current

        if (input !== null) {
            input.onfocus = () => {
                categoriesBinder.dispatch()
            }

            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    if (searchCallback !== undefined) {
                        searchCallback(input.value)
                    }
                }
            }

            if (button !== null) {
                button.onclick = () => {
                    if (searchCallback !== undefined) {
                        searchCallback(input.value)
                    }
                }
            }

        }

        if (categories !== null) {
            categories.onclick = (e) => {
                setShowMenu(s => !s)
                e.stopPropagation()
            }
        }

    }, [categoriesBinder, searchCallback])

    return (
        <div className='search-bar'>
            <div ref={categoriesRef} className='search-bar-categories' tabIndex={0} >
                <div className='search-bar-categories-label'>{selectedItem}</div>
                <img className='search-bar-categories-icon' alt='' src={icChevron} style={{ transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <input ref={inputRef} className='search-bar-input' type='text' spellCheck='false' placeholder='Cari produk kain disini...' />
            <div ref={buttonRef} className='search-bar-button'>
                <img className='search-bar-button-icon' alt='' src={icSearch} />
            </div>
            <div className={`search-bar-menu ${showMenu ? '' : 'search-bar-menu-hide'}`} style={{ height: showMenu ? ((menuItems.length - 1) * 30 + 16) + 'px' : 0 }}>
                {menuItems.map((value, index) => {
                    if (value !== selectedItem) {
                        return (<div key={index} className='search-bar-menu-item' onClick={() => {
                            setSelectedItem(value)
                        }}>{value}</div>)
                    }
                    return ''
                })}
            </div>
        </div>
    )
}

export default SearchBar
