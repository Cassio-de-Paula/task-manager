import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

export default function NotificationSign () {
    return (
        <>
        <div className={styles.notificationSign}>
            <FontAwesomeIcon icon={faBell} color='#ffffff'/>
        </div>
        </>
    )
}