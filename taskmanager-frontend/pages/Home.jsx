import Header from '../src/components/header'
import styles from '../styles/Home.module.css'

export default function Home () {
    return (
        <>
        <div className={styles.homeContainer}>
        <Header/>
        <section className={styles.taskListsSection}>
        </section>
        </div>
        </>
    )
}