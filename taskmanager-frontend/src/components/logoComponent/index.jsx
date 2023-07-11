import styles from './index.module.css'

export default function Logo () {
    return(
        <>
        <div className={styles.logoContainer}>
            <div className={styles.letterContainer}>
            <div className={styles.containerT}>T</div>
            <div className={styles.containerM}>M</div>
            </div>
        </div>
        </>
    )
}
