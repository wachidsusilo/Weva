import { cloneElement, ReactElement, LegacyRef } from "react"

export interface IconProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>
    hidden?: boolean
    className?: string
    classContainer?: string
    width?: string | number
    height?: string | number
    containerRef?: LegacyRef<HTMLDivElement>
    iconRef?: LegacyRef<SVGSVGElement>
}

interface BaseProps extends IconProps {
    children?: ReactElement
}

function Base(props: BaseProps) {
    return (
        <div
            ref={props.containerRef}
            className={props.classContainer}
            style={{
                position: 'relative',
                display: props.hidden ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: props.width,
                height: props.height,
                cursor: props.onClick === undefined ? 'default' : 'pointer'
            }}
            onClick={props.onClick}
        >{props.children ? cloneElement(props.children, { ref: props.iconRef, className: props.className }) : ''}</div>
    )
}

export default Base
