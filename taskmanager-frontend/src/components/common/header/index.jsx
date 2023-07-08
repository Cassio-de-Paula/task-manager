import styles from './index.module.css'

const Header = () => {
    return (
        <>
        <div className={styles.headerContainer}>
        <h2 className={styles.headerLogo}>Task Manager</h2>
        </div>
        </>
    )
}

export default Header