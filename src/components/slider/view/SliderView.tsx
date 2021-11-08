import './SliderView.scss'
import ChevronIcon from '../../../assets/tsx/ChevronIcon'
import SliderBase from '../base/SliderBase'
import { ComponentType, MutableRefObject, useEffect, useRef } from 'react'

interface SliderViewProps {
    images?: Array<string>
    contents?: Array<{
        type: string,
        data: {
            title: string,
            description: string,
            buttonLabel: string
        },
        Component?: ComponentType<any>,
        backgroundColor?: string
    }>,
    contentLinker?: Array<{
        backgroundIndex: number,
        foregroundIndex: number
    }>
}

function SliderView({ images, contents, contentLinker }: SliderViewProps) {
    const slideShowRef: MutableRefObject<boolean> = useRef(false)
    const intervalRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null)
    const sliderRef: MutableRefObject<{
        next: () => void,
        prev: () => void
    }> = useRef({ next: () => { }, prev: () => { } })

    useEffect(() => {
        if(slideShowRef.current) intervalRef.current = setInterval(() => {
            sliderRef.current.next()
        }, 10000)
    }, [])

    return (
        <div className='slider-view'>
            <div className='slider-view-container'>
                <SliderBase sliderRef={sliderRef} images={images} contents={contents} contentLinker={contentLinker} />
            </div>
            <ChevronIcon className='slider-view-chevron' classContainer='slider-view-chevron-container left' direction='left' onClick={() => {
                if(intervalRef.current !== null) clearInterval(intervalRef.current)
                sliderRef.current.prev()
                if(slideShowRef.current) intervalRef.current = setInterval(() => {
                    sliderRef.current.next()
                }, 10000)
            }} />
            <ChevronIcon className='slider-view-chevron' classContainer='slider-view-chevron-container right' direction='right' onClick={() => {
                if(intervalRef.current !== null) clearInterval(intervalRef.current)
                sliderRef.current.next()
                if(slideShowRef.current) intervalRef.current = setInterval(() => {
                    sliderRef.current.next()
                }, 10000)
            }} />
        </div>
    )
}

export default SliderView
