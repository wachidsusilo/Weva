import { MutableRefObject, useEffect, useState } from "react"
import Base, { IconProps } from "./Base"

type Direction = 'up' | 'down' | 'left' | 'right'

export class ChevronAction {
    setDirection: (dir: Direction) => void
    toggleDirection: (first: Direction, second: Direction) => void

    constructor() {
        this.setDirection = () => { }
        this.toggleDirection = () => { }
    }
}

interface ChevronProps extends IconProps {
    actionRef?: MutableRefObject<ChevronAction>
    direction?: Direction
}

const getAngle = (dir: Direction) => {
    switch (dir) {
        case 'up':
            return '180deg'
        case 'down':
            return '0deg'
        case 'left':
            return '90deg'
        case 'right':
            return '270deg'
    }
}

function ChevronIcon(props: ChevronProps) {
    const [direction, setDirection] = useState<Direction>(props.direction ?? 'down')

    useEffect(() => {
        if (props.actionRef) {
            props.actionRef.current.setDirection = (dir) => {
                setDirection(dir)
            }
            
            props.actionRef.current.toggleDirection = (first, second) => {
                setDirection(d => d === first ? second : first)
            }
        }
    }, [props.actionRef])

    return (
        <Base {...props}>
            <svg style={{ transition: 'all 0.15s linear', transform: `rotate(${getAngle(direction)})` }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
        </Base>
    )
}

export default ChevronIcon
