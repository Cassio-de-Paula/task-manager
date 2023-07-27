import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Logo from '../logoComponent'
import '../logoComponent/index.module.css'
import { useEffect, useState } from 'react'
import taskListService from '../../services/taskListService'
import { Link } from 'react-router-dom'
import taskService from '../../services/taskService'
import NotificationSign from '../notificationSign'

export default function Header () {
    const [showOptions, setShowOptions] = useState(false)
    const [taskListIds, setTaskListIds] = useState([])
    const [taskListElement, setTaskListElement] = useState([])

    const handleUser = () => {
        if(showOptions) {
            setShowOptions(false)
        } else {
            setShowOptions(true)
        }
    }

    const handleTaskLists = async () => {
        const {data} = await taskListService.getTaskLists()

        if(data) {
            setTaskListElement(data)
        }
    }

    const handleNotifications = async () => {
        const {data} = await taskService.getNotifications()

       if(data) {
        const dataArray = [].concat(...data)

        let taskLists = dataArray.map((task) => {
            if(task) {
                return task.taskListId
            }
        })

        taskLists = taskLists.filter((taskListIds, index) => {
            return taskListIds !== undefined && taskLists.indexOf(taskListIds) === index
        })

        setTaskListIds(taskLists)
    }
    }

    useEffect(() => {
        handleNotifications()
        handleTaskLists()
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
                    taskListIds ? (
                        <NotificationSign/>
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
                                taskListElement.map((taskList) => (
                                    <Link to={`/home/taskLists/${taskList.id}/tasks`}>
                                    <div className={styles.taskList} style={{backgroundColor:`${taskList.color}`}}><p>{taskList.name}</p>
                                    {
                                        taskListIds.includes((taskList.id)) ? (
                                           <NotificationSign/>
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