import { LegacyRef, useCallback, useEffect, useRef } from 'react'
import Header from '../../components/header/Header'
import { useBinder } from '../../utilities/binder'
import { FIELD_BINDER } from '../../constants/constant'
import './Blog.scss'

function Blog() {
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
        <div ref={bodyRef} className="blog">
            <Header searchCallback={searchCallback} />
            <div style={{height: '2000px'}}>Blog</div>
        </div>
    )
}

export default Blog