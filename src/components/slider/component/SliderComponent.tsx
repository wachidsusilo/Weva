import { ComponentType, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import SliderContentSimple from '../content/simple/SliderContentSimple'
import './SliderComponent.scss'

interface SliderComponentProps {
    backgroundColor?: string,
    animatorRef?: MutableRefObject<{
        play: (index: number) => void
    }>
    contents?: Array<{
        type: string,
        data: {
            title: string,
            description: string,
            buttonLabel: string
        },
        Component?: ComponentType<any>,
        backgroundColor?: string
    }>
}

function SliderComponent({ backgroundColor = 'transparent', animatorRef, contents = [] }: SliderComponentProps) {
    const [index, setIndex] = useState<number>(0)
    const indexRef: MutableRefObject<number> = useRef(0)
    const displayRef: MutableRefObject<boolean> = useRef(false)
    const callbackRef: MutableRefObject<{
        show: () => void,
        hide: () => void
    }> = useRef({ show: () => { }, hide: () => { } })

    const onTransitionEnd = useCallback(() => {
        setIndex(indexRef.current)
    }, [])

    useEffect(() => {
        if (animatorRef) {
            animatorRef.current = {
                play: (index: number) => {
                    indexRef.current = index
                    if (displayRef.current) {
                        callbackRef.current.hide()
                    } else {
                        setIndex(index)
                    }
                    displayRef.current = (index >= 0)
                }
            }
        }
    }, [animatorRef, backgroundColor])

    let Content: {
        type: string,
        data: {
            title: string,
            description: string,
            buttonLabel: string
        },
        Component?: ComponentType<any>,
        backgroundColor?: string
    } | null = null

    if (contents.length > 0 && indexRef.current >= 0) {
        Content = contents[index]
    }

    return (
        <div className='slider-component' style={{ backgroundColor: Content && Content.backgroundColor ? Content.backgroundColor : 'transparent' }}>
            {Content ?
                Content.type === 'simple' ?
                    <SliderContentSimple
                        callbackRef={callbackRef}
                        title={Content.data.title}
                        description={Content.data.description}
                        buttonLabel={Content.data.buttonLabel}
                        onTransitionEnd={onTransitionEnd}
                    />
                    :
                    Content.Component ?
                        <Content.Component callbackRef={callbackRef} onTransitionEnd={onTransitionEnd} />
                        :
                        ''
                :
                ''
            }
        </div>
    )
}

export default SliderComponent
