import LogoName from '../logoName'
import styles from './index.module.css'

export default function HomeNoAuth() {
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