import styles from './index.module.css'

export default function Message (props) {
    return(
        <div>
            <p className={props.error ? styles.errorMessage : styles.successMessage}>{props.message}</p>
        </div>
    )
}