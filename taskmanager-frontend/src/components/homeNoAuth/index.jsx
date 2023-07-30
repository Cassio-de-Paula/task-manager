import { useEffect } from 'react'
import LogoName from '../logoName'
import styles from './index.module.css'
import btn from '../button/index.module.css'
import { useNavigate } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function HomeNoAuth() {
    const router = useNavigate()
    
    useEffect(() => {
        const token = sessionStorage.getItem('taskManager-token')

        if(token) {
            router('/home')
        }

        Aos.init()
    }, [])

    return (
        <>
        <main className={styles.main}>
        <section className={styles.welcome} data-aos='zoom-in' data-aos-duration='1500'>
            <LogoName/>
            <div className={styles.buttonContainer}>
            <a href="/register">
                <button className={btn.btn}>QUERO FAZER PARTE</button>
            </a>
            <a href="/login">
                <button className={btn.btn}>JÁ POSSUO CONTA</button>
            </a>
            </div>
        </section>
        </main>
        </>
    )
}