import { useEffect } from 'react'
import LogoName from '../logoName'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'

export default function HomeNoAuth() {
    const router = useNavigate()
    
    useEffect(() => {
        const token = sessionStorage.getItem('taskManager-token')

        if(token) {
            router.push('/home')
        }
    }, [])

    return (
        <>
        <div className={styles.main}>
        <div className={styles.welcome}>
            <LogoName/>
            <div className={styles.buttonContainer}>
            <a href="/register">
                <button>QUERO FAZER PARTE</button>
            </a>
            <a href="/login">
                <button>JÁ POSSUO CONTA</button>
            </a>
            </div>
        </div>
        </div>
        </>
    )
}