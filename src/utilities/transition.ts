
type Position = 'top' | 'bottom'
type Easing = 'in' | 'out'
type Anchor = 'top' | 'left' | 'right' | 'bottom'

export const setPosition = (position: Position, ...element: Array<HTMLElement>) => {
    switch (position) {
        case 'top':
            element.forEach(e => {
                e.style.top = '0'
                e.style.bottom = ''
            })
            break
        case 'bottom':
            element.forEach(e => {
                e.style.top = ''
                e.style.bottom = '0'
            })
            break
    }
}

export const setTransition = (easing: Easing, ...element: Array<HTMLElement>) => {
    switch (easing) {
        case 'in':
            element.forEach(e => e.style.transition = 'all 0.5s ease-in')
            break
        case 'out':
            element.forEach(e => e.style.transition = 'all 0.5s ease-out')
            break
    }
}

export const setHalfTransition = (easing: Easing, ...element: Array<HTMLElement>) => {
    switch (easing) {
        case 'in':
            element.forEach(e => e.style.transition = 'all 0.35s ease-in')
            break
        case 'out':
            element.forEach(e => e.style.transition = 'all 0.35s ease-out')
            break
    }
}

export const clearTransition = (...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.transition = 'none')
}

export const setBackgroundColor = (color: string, ...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.backgroundColor = color)
}

export const clearBackgroundColor = (...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.backgroundColor = 'transparent')
}

export const setHeight = (height: string, ...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.height = height)
}

export const setMargin = (margin: string, anchor: Anchor, ...element: Array<HTMLElement>) => {
    switch (anchor) {
        case 'top':
            element.forEach(e => e.style.marginTop = margin)
            break
        case 'left':
            element.forEach(e => e.style.marginLeft = margin)
            break
        case 'bottom':
            element.forEach(e => e.style.marginBottom = margin)
            break
        case 'right':
            element.forEach(e => e.style.marginRight = margin)
            break
    }
}

export const setColor = (color: string, ...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.color = color)
}

export const clearColor = (...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.color = 'transparent')
}

export const setOpacity = (opacity: number, ...element: Array<HTMLElement>) => {
    element.forEach(e => e.style.opacity = opacity + '')
}
