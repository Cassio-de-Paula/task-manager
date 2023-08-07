import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import Logo from '../logoComponent'
import '../logoComponent/index.module.css'
import { useEffect, useState } from 'react'
import taskListService from '../../services/taskListService'
import { Link, useNavigate } from 'react-router-dom'
import taskService from '../../services/taskService'
import NotificationSign from '../notificationSign'
import Aos from 'aos'

export default function Header () {
    const router = useNavigate()
    const [showOptions, setShowOptions] = useState(false)
    const [taskListIds, setTaskListIds] = useState([])
    const [taskListElement, setTaskListElement] = useState([])
    const [name, setName] = useState('')

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

    const handleSearch = (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('searchBar')
        setName(name)

        router(`/home/search?name=${name}`)
    }

    useEffect(() => {
        handleNotifications()
        handleTaskLists()
        Aos.init()
    }, [showOptions])

    return (
        <>
        <header className={styles.header}>
            <a href="/home">
                <Logo className={styles.logo}/>
            </a>
            <div className={styles.inputContainer}>
                <form onSubmit={handleSearch}>
                <input type="text" name='searchBar' id='name' placeholder='Pesquise por tarefas e listas...' className={styles.searchInput}/>
                <button type='submit' className={styles.submitBtn}>
                <FontAwesomeIcon icon={faSearch} color='#ffffff' size='lg' className={styles.searchIcon}/>
                </button>
                </form>
            </div>
            <div className={styles.userProfile} onClick={handleUser}>
                {
                    taskListIds.length > 0 ? (
                        <NotificationSign/>
                        ) : (
                            <></>
                        )
                }
                <span className={styles.userIcon}>
                    <FontAwesomeIcon icon={faUser} color='#9ad0ff' size='4x'/>
                </span>
            </div>
        </header>
            {
                showOptions ? (
                    <section className={styles.profileSection} data-aos='fade-down' data-aos-duration='200'>
                        <Link to={'/home/myAccount'}>
                            <p className={styles.text}>Minha conta</p>
                        </Link>
                        <div className={styles.notifications}>
                            <p className={styles.text}>Notificações</p>
                           
                            {
                                taskListElement.map((taskList) => (
                                    <Link to={`/home/taskLists/${taskList.id}/tasks`}>
                                    <div className={styles.taskList} style={{backgroundColor:`${taskList.color}`}}><p className={styles.text}>{taskList.name}</p>
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
                    </section>
                    ) : (
                        <>
                        </>
                    )
                } 
        </>
    )
}