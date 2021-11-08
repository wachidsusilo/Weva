
type Direction = 'top' | 'bottom' | 'left' | 'right'

export interface IconProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    className?: string,
    classContainer?: string,
    width?: string | number,
    height?: string | number,
    direction?: Direction
}

const getAngle = (direction: Direction) => {
    switch (direction) {
        case 'top':
            return '180deg'
        case 'left':
            return '90deg'
        case 'right':
            return '-90deg'
        default:
            return '0deg'
    }
}

function ChevronIcon({ className, classContainer, onClick, width, height, direction = 'bottom' }: IconProps) {
    return (
        <div className={classContainer} style={{ position: classContainer ? undefined : 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: width, height: height }} onClick={onClick}>
            <svg className={className} style={{transform: `rotate(${getAngle(direction)})`}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#313131">
                <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
        </div>
    )
}

export default ChevronIcon
