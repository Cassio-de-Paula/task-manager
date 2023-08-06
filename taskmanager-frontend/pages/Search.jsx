import { useEffect, useState } from "react"
import { dateFormat, search, taskListHook, tasksHook } from '../hooks/hooks'
import styles from '../styles/Search.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation, useParams } from "react-router-dom"
import taskService from "../src/services/taskService"
import taskListService from "../src/services/taskListService"
import NotificationSign from "../src/components/notificationSign"

export default function SearchResults () {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const name = searchParams.get('name')

    const [tasks, setTasks] = useState([])
    const [taskLists, setTaskLists] = useState([])
    const [taskIds, setTaskIds] = useState([])
    const [taskListsMessage, setTaskListsMessage] = useState('Sem resultados para a pesquisa')
    const [tasksMessage, setTasksMessage] = useState('Sem resultados para a pesquisa')
    
    const handleSearch = async () => {        
        const {taskListResults, taskResults} = await search(name)

       setTaskLists(taskListResults)
       setTasks(taskResults)

       if(taskListResults.length > 0 && taskResults.length > 0) {
        setTaskListsMessage('')
        setTasksMessage('')
       } else if (taskListResults.length > 0) {
        setTaskListsMessage('')
       } else if (taskResults.length > 0) {
        setTasksMessage('')
       }
    }

    const handleTaskDone = async (ev) => {
        let {id} = ev.currentTarget
        let { className } = ev.currentTarget
        let {tasklist} = ev.currentTarget

        if(className == styles.checked) {
            const params = {id, done: false}
            const {status} = await taskService.updateTask(tasklist, params)
            if(status === 200) {
                handleSearch()
            }

        } else {
            const params = {id, done: true}
            const {status} = await taskService.updateTask(tasklist, params)
            if(status === 200) {
                handleSearch()
            }
        }
    }

    const handleDeleteTask = async (ev) => {
        let {id} = ev.currentTarget
        let {tasklist} = ev.currentTarget

        const {status} = await taskService.removeTask(tasklist, id)

        if(status === 200) {
            handleSearch()
        }
    }

    const handleEditScreen = (ev) => {
        let {id} = ev.currentTarget

    }

    const handleNotifications = async () => {
        const {data} = await taskService.getNotifications()

       if(data) {
        const dataArray = [].concat(...data)

        let tasks = dataArray.map((task) => {
            if(task) {
                return task.id
            }
        })

        
        tasks = tasks.filter((taskIds) => {
            return taskIds !== undefined
        })
        
        setTaskIds(tasks)
    }
    }

    const handleDeleteTaskList = async (ev) => {
        ev.preventDefault()
        let {id} = ev.currentTarget

        const data = await tasksHook.tasks(id)
        
        if(data.length === 0) {
            const taskListResponse = await taskListService.removeTaskList(+id)

            if(taskListResponse.status === 200) {
                handleSearch()
            }

        } else {
            const taskResponse = await taskService.removeAllTasks(id)

            if(taskResponse.status === 200) {
                const taskListResponse = await taskListService.removeTaskList(id)
    
                if(taskListResponse.status === 200) {
                    handleSearch()
                }
            }
        }
        

    }

    useEffect(() => {
        handleSearch()
        handleNotifications()
    }, [name, location, tasks, taskLists])

    
    return (
        <>
        <section className={styles.taskListResults}>
        <span className={styles.resultTitle}>Listas de Tarefas</span>
        {
            taskListsMessage ? (
                <span className={styles.messageContainer}>
                    <p>{taskListsMessage}</p>
                </span>
            ) : (
                <>
                <section className={styles.resultsContainer}>
                {
                    taskLists.map((taskList) => (
                        <div className={styles.taskListContainer} style={{backgroundColor:`${taskList.color}`}} key={taskList.id}>
                            <Link to={`/home/taskLists/${taskList.id}/tasks`}>
                            <p className={styles.title}>{taskList.name}</p>
                            </Link>
                            <p className={styles.description}>Você tem {taskList.taskCounter} tarefas nesta lista</p>
                            <span className={styles.btnContainer}>
                                <button className={styles.tool}>
                                    <FontAwesomeIcon icon={faPencil} color="#909090"/>
                                </button>
                                <button className={styles.tool} id={taskList.id} onClick={handleDeleteTaskList}>
                                    <FontAwesomeIcon icon={faTrash}  color="#909090"/>
                                </button>
                            </span>
                        </div>
                    ))
                }
            </section>
            </>
            )
        }
        </section>
        <section className={styles.taskResults}>
        <span className={styles.resultTitle}>Tarefas</span>
        {
            tasksMessage ? (
                <span className={styles.messageContainer}>
                    <p>{tasksMessage}</p>
                </span>
            ) : (
                <>
                <section className={styles.resultsContainer}>
                    {
                        tasks.map((task) => (
                            <div className={task.done ? styles.done : styles.taskContainer} key={task.id}>
                                <span className={styles.taskTitle}>
                                <p className={task.done ? styles.titleDone : styles.title}>{task.name}</p>
                                {
                                    taskIds.includes(task.id) ? (<NotificationSign/>) : (<></>)
                                }
                                </span>
                                <p className={styles.taskDate}>{task.deadline ? dateFormat(task.deadline) : null}</p>
                                <p className={styles.taskUrgency}>{task.urgency ? `Aviso para ${task.urgency} dias antes` : null}</p>
                                <span className={styles.btnContainer}>
                                    <button id={task.id} tasklist={task.taskListId} className={task.done ? styles.checked : styles.tool} onClick={handleTaskDone}><FontAwesomeIcon icon={faCheck} color="#909090"/></button>
                                    <button id={task.id} tasklist={task.taskListId} className={styles.tool} onClick={handleEditScreen}><FontAwesomeIcon icon={faPencil} color="#909090"/></button>
                                    <button id={task.id} tasklist={task.taskListId} className={styles.tool} onClick={handleDeleteTask}><FontAwesomeIcon icon={faTrash} color="#909090"/></button>
                                </span>
                            </div>
                        ))
                    }
                </section>
                </>
            )
        }
        </section>
        </>
    )
}