import { LegacyRef, useCallback, useEffect, useRef } from 'react'
import Header from '../../components/header/Header'
import { useBinder } from '../../utilities/binder'
import { FIELD_BINDER } from '../../constants/constant'
import './Warehouse.scss'

function Warehouse() {
    const bodyRef: LegacyRef<HTMLDivElement> = useRef(null)
    const fieldBinder = useBinder(FIELD_BINDER)

    useEffect(() => {
        const body = bodyRef.current

        if(body !== null) {
            body.onclick = () => {
                fieldBinder.dispatch()
            }
        }
    }, [fieldBinder])

    
    const searchCallback = useCallback((query: string) => {
        console.log(query)
    }, [])

    return (
        <div ref={bodyRef} className="warehouse">
            <Header searchCallback={searchCallback} />
            <div style={{height: '2000px'}}>Warehouse</div>
        </div>
    )
}

export default Warehouse