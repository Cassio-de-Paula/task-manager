import styles from './index.module.css'

export default function ErrorMessage (props) {
    return(
        <p className={styles.errorMessage}>{props.message}</p>
    )
}