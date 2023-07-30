import styles from '../styles/Home.module.css'
import Header from '../src/components/header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home () {
    const router = useNavigate()

    const handleToken = () => {
        const token = sessionStorage.getItem('taskManager-token')

        if(!token) {
            router('/')
        }
    }

    useEffect(() => {
        handleToken()
    }, [])

    return (
        <>
        <main className={styles.mainContainer}>
            <Header/>
            <section className={styles.homeContainer}>
                <Outlet/>
            </section>
        </main>
        </>
    )
}