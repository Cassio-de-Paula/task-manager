import styles from './index.module.css'

export default function HomeComponent () {
    return (
        <div className={styles.welcome}>
        <h1>Bem Vindo ao <br /> Task Manager</h1>
        <a href="/home/taskLists">
            <button className={styles.btn}><p className={styles.btnText}>COMEÇAR</p></button>
        </a>
        </div>
    )
}