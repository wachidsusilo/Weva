import './SliderBase.scss'
import { ComponentType, LegacyRef, MutableRefObject, useEffect, useRef } from 'react';
import { clearBackgroundColor, clearTransition, setBackgroundColor, setHeight, setPosition, setTransition } from '../../../utilities/transition';
import SliderComponent from '../component/SliderComponent';
import { Log } from '../../../utilities/log';

interface SliderBaseProps {
    sliderRef?: MutableRefObject<{
        next: () => void,
        prev: () => void
    }>,
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

function SliderBase({ sliderRef, images = [], contents, contentLinker = [] }: SliderBaseProps) {
    const baseRef: LegacyRef<HTMLImageElement> = useRef(null)
    const imageCurrentRef: LegacyRef<HTMLImageElement> = useRef(null)
    const imageAfterRef: LegacyRef<HTMLImageElement> = useRef(null)
    const containerRef: LegacyRef<HTMLDivElement> = useRef(null)
    const overlayRef: LegacyRef<HTMLDivElement> = useRef(null)
    const innerOverlayRef: LegacyRef<HTMLDivElement> = useRef(null)
    const innerImageRef: LegacyRef<HTMLImageElement> = useRef(null)
    const currentIndexRef: MutableRefObject<number> = useRef(0)
    const animatingRef: MutableRefObject<boolean> = useRef(false)
    const animatorRef: MutableRefObject<{
        play: (index: number) => void
    }> = useRef({ play: () => { } })

    useEffect(() => {
        const base = baseRef.current
        const imageCurrent = imageCurrentRef.current
        const imageAfter = imageAfterRef.current
        const container = containerRef.current
        const overlay = overlayRef.current
        const innerOverlay = innerOverlayRef.current
        const innerImage = innerImageRef.current

        Log('slider-base:', 'instantiate-view')

        if (base && imageCurrent && imageAfter && container && overlay && innerOverlay && innerImage && sliderRef) {

            Log('slider-base:', 'instantiate-animation')

            const animateImage = (idxAfter: number) => {
                Log('slider-animation:', 'phase 1')
    
                //Set container position to top then animate the height from 0 to 100%
                setPosition('top', container)
                setHeight('0', container)
                setTransition('in', container)
                setHeight('100%', container)

                //Animate the height of current image from 100% to 0
                setTransition('in', imageCurrent)
                setHeight('0', imageCurrent)

                //Set image buffer position to top
                setPosition('top', imageAfter)
                setHeight('0', imageAfter)

                //Clear overlay background then apply transition to them
                clearBackgroundColor(overlay, innerOverlay)
                setTransition('in', overlay, innerOverlay)

                //Assign callback to overlay element, so we know when to start next animation
                overlay.ontransitionend = () => {
                    Log('slider-animation:', 'phase 2')

                    //Clear callback from the overlay element
                    overlay.ontransitionend = null

                    //Assign callback to imageAfter element, so we know when to start next animation
                    imageAfter.ontransitionend = () => {
                        Log('slider-animation:', 'phase 3')

                        //Clear callback from the imageAfter element
                        imageAfter.ontransitionend = null

                        //Clear all the transition effect
                        clearTransition(base, imageCurrent, imageAfter, container, overlay, innerOverlay, innerImage)

                        //When imageAfter transition end, set chosen image to imageCurrent and hide imageAfter (image buffer)
                        imageCurrent.src = images[idxAfter]
                        setHeight('100%', imageCurrent)
                        setPosition('bottom', imageCurrent)
                        setHeight('0', imageAfter)

                        //Set current index according to the chosen image
                        currentIndexRef.current = idxAfter
                        animatingRef.current = false
                    }

                    //When overlay transition end, set container position to bottom
                    clearTransition(container)
                    setPosition('bottom', container)

                    //Set container height from 100% to 0. Set imageAfter from 0 to 100%
                    setTransition('out', container, imageAfter)
                    setHeight('0', container)
                    setHeight('100%', imageAfter)

                    //Clear overlay background
                    clearBackgroundColor(overlay)
                }

                Log('slider-overlay:', overlay.style.backgroundColor)
                setBackgroundColor('#00000051', overlay, innerOverlay)
                Log('slider-overlay:', overlay.style.backgroundColor)
            }

            sliderRef.current = {
                next: () => {
                    Log('slider:', animatingRef.current? 'animating' : 'idle', currentIndexRef.current)
                    if (!animatingRef.current && images.length > 0) {
                        animatingRef.current = true
                        const idxAfter = ((currentIndexRef.current + 1) < images.length) ? currentIndexRef.current + 1 : 0
                        imageAfter.src = images[idxAfter]
                        innerImage.src = images[idxAfter]
                        animateImage(idxAfter)
                        const linker = contentLinker.find((value) => value.backgroundIndex === idxAfter)
                        animatorRef.current.play(linker ? linker.foregroundIndex : -1)
                    }
                },
                prev: () => {
                    if (!animatingRef.current && images.length > 0) {
                        animatingRef.current = true
                        const idxAfter = ((currentIndexRef.current - 1) < 0) ? images.length - 1 : currentIndexRef.current - 1
                        imageAfter.src = images[idxAfter]
                        innerImage.src = images[idxAfter]
                        animateImage(idxAfter)
                        const linker = contentLinker.find((value) => value.backgroundIndex === idxAfter)
                        animatorRef.current.play(linker ? linker.foregroundIndex : -1)
                    }
                }
            }

            setTimeout(() => {
                animatingRef.current = true
                animateImage(0)
                const linker = contentLinker.find((value) => value.backgroundIndex === 0)
                animatorRef.current.play(linker ? linker.foregroundIndex : -1)
                Log('slider-linker:', linker ? linker.foregroundIndex : -1)
            }, 300)

        }

        return () => {
            animatingRef.current = false
        }

    }, [sliderRef, images, contentLinker])

    return (
        <div ref={baseRef} className='slider-base'>
            <img ref={imageCurrentRef} className='slider-base-bg' style={{ bottom: '0' }} alt='' src={images[0]} />
            <img ref={imageAfterRef} className='slider-base-bg' style={{ top: '0' }} alt='' src={images[0]} />
            <div ref={containerRef} className='slider-base-container'>
                <img ref={innerImageRef} className='slider-base-container-bg' alt='' src={images[0]} />
                <div ref={innerOverlayRef} className='slider-base-container-overlay' />
            </div>
            <div ref={overlayRef} className='slider-base-overlay' />
            <div className='slider-base-component'>
                <SliderComponent backgroundColor='#00000000' animatorRef={animatorRef} contents={contents} />
            </div>
        </div>
    )
}

export default SliderBase
