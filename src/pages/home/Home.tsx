import './Home.scss'
import { LegacyRef, useCallback, useEffect, useRef } from 'react'
import Header from '../../components/header/Header'
import SliderView from '../../components/slider/view/SliderView'
import { useBinder } from '../../utilities/binder'
import { FIELD_BINDER } from '../../constants/constant'
import bg1 from '../../assets/images/bg_1.jpg'
import bg2 from '../../assets/images/bg_2.jpg'
import bg3 from '../../assets/images/bg_3.jpg'
import bg4 from '../../assets/images/bg_4.jpeg'
import bg5 from '../../assets/images/bg_5.jpeg'

const images = [bg1, bg2, bg3, bg4, bg5]

const contents = [
    {
        type: 'simple',
        data: {
            title: 'PT. WEVA ADHIJAYA PERKASA',
            description: 'SUPPLIER DRIFIT TER-LENGKAP\nBrazil, Billabong, Milano\n& Puluhan Motif Lain',
            buttonLabel: 'Read More'
        },
        backgroundColor: '#00000071'
    },
    {
        type: 'simple',
        data: {
            title: 'PT. WEVA ADHIJAYA PERKASA',
            description: 'SUPPLIER KATUN TER-MURAAAH\nKatun Combed 24s 30s\nLacoste CVC Pique 20s',
            buttonLabel: 'Read More'
        },
        backgroundColor: '#00000071'
    },
    {
        type: 'simple',
        data: {
            title: 'PT. WEVA ADHIJAYA PERKASA',
            description: 'SUPPLIER KAIN PARASUT\nGORETEX, TASLAN, DESPO, DLL\nLENGKAP SEMUA WARNA',
            buttonLabel: 'Read More'
        },
        backgroundColor: '#00000071'
    }
]

const contentLinker = [
    {
        backgroundIndex: 2,
        foregroundIndex: 0
    },
    {
        backgroundIndex: 3,
        foregroundIndex: 1
    },
    {
        backgroundIndex: 4,
        foregroundIndex: 2
    }
]

function Home() {
    const bodyRef: LegacyRef<HTMLDivElement> = useRef(null)
    const fieldBinder = useBinder(FIELD_BINDER)

    useEffect(() => {
        const body = bodyRef.current

        if (body !== null) {
            body.onclick = () => {
                fieldBinder.dispatch()
            }
        }
    }, [fieldBinder])


    const searchCallback = useCallback((query: string) => {
        console.log(query)
    }, [])

    return (
        <div ref={bodyRef} className="home">
            <Header searchCallback={searchCallback} />
            <SliderView images={images} contents={contents} contentLinker={contentLinker} />
            <div style={{ height: '60px' }} />
        </div>
    )
}

export default Home