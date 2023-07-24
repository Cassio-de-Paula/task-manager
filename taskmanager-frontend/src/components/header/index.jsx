import styles from './index.module.css'
import Logo from '../logoComponent'
import '../logoComponent/index.module.css'
import { useEffect, useState } from 'react'
import { taskNotifications } from '../../../hooks/hooks'
import taskListService from '../../services/taskListService'
import { Link } from 'react-router-dom'

export default function Header () {
    const [showOptions, setShowOptions] = useState(false)
    const [taskLists, setTaskLists] = useState([])
    const [notifications, setNotifications] = useState([])
    const [IdsArray, setIdsArray] = useState([])
    const [notificationsMessage, setNotificationsMessage] = useState('')

    const handleUser = () => {
        if(showOptions) {
            setShowOptions(false)
        } else {
            setShowOptions(true)
        }
    }

    const handleNotifications = async () => {
        const {filteredTasks, taskListIds, data} = await taskNotifications()

        if(filteredTasks.length === 0) {
            setNotificationsMessage('Você não possui notificações!')
        } else {
            setNotifications(filteredTasks)
            setIdsArray(taskListIds)
            setTaskLists(data)
        }
    }

    useEffect(() => {
        handleNotifications()
    }, [showOptions])

    return (
        <>
        <header className={styles.header}>
            <a href="/home">
                <Logo className={styles.logo}/>
            </a>
            <div className={styles.inputContainer}>
                <input type="text" name='searchBar' className={styles.searchInput}/>
            </div>
            <div className={styles.userProfile} onClick={handleUser}>
                {
                    notifications ? (
                        <div className={styles.notificationSign}>!</div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </header>
            {
                showOptions ? (
                    <div className={styles.profileSection}>
                        <a href="/myAccount">
                            <p>Minha conta</p>
                        </a>
                        <div className={styles.notifications}>
                            <p>Notificações</p>
                           
                            {
                                taskLists.map((taskList) => (
                                    <Link to={`/home/taskLists/${taskList.id}/tasks`}>
                                    <div className={styles.taskList} style={{backgroundColor:`${taskList.color}`}}><p>{taskList.name}</p>
                                    {
                                        IdsArray.includes((taskList.id)) ? (
                                            <div className={styles.notificationSign}>!</div>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                    </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    ) : (
                        <>
                        </>
                    )
                } 
        </>
    )
} 