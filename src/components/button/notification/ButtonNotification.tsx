import { MutableRefObject, useEffect, useState } from 'react'
import './ButtonNotification.scss'

interface ButtonNotificationProps {
    icon: React.ComponentType<any>,
    showCounter?: boolean,
    showTitle?: boolean,
    count?: number,
    titleLabel?: string,
    titleValue?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    setValueRef?: MutableRefObject<((value: string) => void) | null>,
    setCountRef?: MutableRefObject<((count: number) => void) | null>
}

function ButtonNotification({ icon, showCounter = true, showTitle = true, count = 0, titleLabel = 'Label', titleValue = 'Value', onClick, setValueRef, setCountRef }: ButtonNotificationProps) {
    const [value, setValue] = useState<string>(titleValue)
    const [counter, setCounter] = useState<number>(count > 99 ? 99 : count)
    const Icon = icon

    useEffect(() => {
        if(setValueRef !== undefined) {
            setValueRef.current = (v) => {
                setValue(v)
            }
        }

        if(setCountRef !== undefined) {
            setCountRef.current = (c) => {
                setCounter(c)
            }
        }
    }, [setCountRef, setValueRef])

    return (
        <div className='button-notification' style={{width: showTitle ? '100px' : '40px'}}>
            <div className='button-notification-logo'>
                <Icon className='button-notification-logo-icon' onClick={onClick} />
                <div className={`button-notification-logo-counter ${showCounter ? '' : 'hide'}`}>
                    <div className='button-notification-logo-counter-label'>{counter}</div>
                </div>
            </div>
            <div className={`button-notification-title ${showTitle ? '' : 'hide'}`}>
                <div className='button-notification-title-label'>{titleLabel}</div>
                <div className='button-notification-title-value'>{value}</div>
            </div>
        </div>
    )
}

export default ButtonNotification
