import styles from '../styles/Home.module.css'
import Header from '../src/components/header'
import { Outlet } from 'react-router-dom'

export default function Home () {
    return (
        <>
        <div className={styles.mainContainer}>
            <Header/>
        <div className={styles.homeContainer}>
            <Outlet/>
        </div>
        </div>
        </>
    )
}