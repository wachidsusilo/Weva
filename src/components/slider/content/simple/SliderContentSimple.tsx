import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import { clearTransition, setHalfTransition, setMargin, setOpacity } from '../../../../utilities/transition'
import './SliderContentSimple.scss'

type AnimationType = 'in' | 'out'

interface SliderContentSimpleProps {
    callbackRef?: MutableRefObject<{
        show: () => void,
        hide: () => void
    }>,
    title?: string,
    description?: string,
    buttonLabel?: string,
    onTransitionEnd?: () => void
}

function SliderContentSimple({ callbackRef, title = '', description = '', buttonLabel = '', onTransitionEnd }: SliderContentSimpleProps) {
    const titleRef: LegacyRef<HTMLDivElement> = useRef(null)
    const descriptionRef: LegacyRef<HTMLDivElement> = useRef(null)
    const buttonRef: LegacyRef<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const title = titleRef.current
        const description = descriptionRef.current
        const button = buttonRef.current

        if (title && description && button && callbackRef) {

            const animate = (type: AnimationType) => {
                switch (type) {
                    case 'in':
                        clearTransition(title, description, button)
                        setMargin('10vw', 'left', title, description, button)
                        setOpacity(0, title, description, button)
                        
                        setHalfTransition('in', title, description, button)
                        setMargin('0', 'left', title, description, button)
                        setOpacity(1, title, description, button)
                        break
                    case 'out':
                        if(onTransitionEnd) {
                            title.ontransitionend = () => {
                                title.ontransitionend = null
                                onTransitionEnd()
                            }
                        }
                        
                        clearTransition(title, description, button)
                        setMargin('0', 'left', title, description, button)
                        setOpacity(1, title, description, button)
                        
                        setHalfTransition('in', title, description, button)
                        setMargin('10vw', 'left', title, description, button)
                        setOpacity(0, title, description, button)
                        break
                }
            }

            callbackRef.current = {
                show: () => {
                    animate('in')
                },
                hide: () => {
                    animate('out')
                }
            }

            animate('in')
        }

    })

    return (
        <div className='slider-content-simple'>
            <div ref={titleRef} className='slider-content-simple-title'>{title}</div>
            <div ref={descriptionRef} className='slider-content-simple-description'>
                {description.split('\n').map((value, index) => <div key={index}>{value}</div>)}
            </div>
            <div ref={buttonRef} className='slider-content-simple-button'>{buttonLabel}</div>
        </div>
    )
}

export default SliderContentSimple
