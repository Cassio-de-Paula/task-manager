import { useLocation, useParams } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'
import { useEffect, useState } from 'react'
import TaskForm from '../src/components/taskForm'
import { dateFormat, tasksHook } from '../hooks/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck , faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import taskService from '../src/services/taskService'
import NotificationSign from '../src/components/notificationSign'


export default function Tasks () {
    const {taskListId} = useParams()
    const location = useLocation()

    const [postMethod, setPostMethod] = useState(true)
    const [message, setMessage] = useState(false)
    const [showTasks, setShowTasks] = useState([])
    const [formId, setFormId] = useState('')
    const [taskIds, setTaskIds] = useState([])

    const handleGetTasks = async () => {
        const data = await tasksHook.tasks(taskListId)

        if(data.length === 0) {
            setMessage(true)
        } else {
            setShowTasks(data)
            setMessage(false)
            setPostMethod(true)
        }
    }

    const handleTaskDone = async (ev) => {
        let {id} = ev.currentTarget
        let { className } = ev.currentTarget

        if(className == styles.checked) {
            const params = {id, done: false}
            const {status} = await taskService.updateTask(taskListId, params)
            if(status === 200) {
                handleGetTasks()
            }

        } else {
            const params = {id, done: true}
            const {status} = await taskService.updateTask(taskListId, params)
            if(status === 200) {
                handleGetTasks()
            }
        }
    }

    const handleDeleteTask = async (ev) => {
        let {id} = ev.currentTarget

        const {status} = await taskService.removeTask(taskListId, id)

        if(status === 200) {
            handleGetTasks()
        }
    }

    const handleEditScreen = (ev) => {
        let {id} = ev.currentTarget

        setPostMethod(false)
        setFormId(id)
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

    useEffect(() => {
        handleGetTasks()
        handleNotifications()
    }, [taskListId, location])

    return (
        <>
        <TaskForm postMethod={postMethod} handleGetTasks={handleGetTasks} taskListId={formId}/>
            {
                message ? (
                    <p className={styles.message}>Parece que você ainda não possui tarefas <br /> crie uma usando a caixa ao lado!</p>
                ) : (
                    <section className={styles.tasksContainer}>
                        {
                            showTasks.map((task) => (
                                <div className={task.done ? styles.done : styles.taskContainer} key={task.id}>
                                    <span className={styles.taskTitle}>
                                    <p className={task.done ? styles.taskDone : styles.taskText}>{task.name}</p>
                                    {
                                        taskIds.includes(task.id) ? (<NotificationSign/>) : (<></>)
                                    }
                                    </span>
                                    {
                                        task.deadline ? (
                                            <p className={styles.taskDate}>{dateFormat(task.deadline)}</p>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                    {
                                        task.urgency ? (
                                            <p className={styles.taskUrgency}>Aviso {task.urgency} dias antes</p>
                                        )  : (
                                            <>
                                            </>
                                        )
                                    }
                                    <div className={styles.taskBtnContainer}>
                                        <button className={task.done ? styles.checked : styles.tool} id={task.id} onClick={handleTaskDone}><FontAwesomeIcon icon={faCheck} color='#909090'/></button>
                                        <button className={styles.tool} id={task.id} onClick={handleEditScreen}><FontAwesomeIcon icon={faPencil} color='#909090'/></button>
                                        <button className={styles.tool} id={task.id} onClick={handleDeleteTask}><FontAwesomeIcon icon={faTrash} color='#909090'/></button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                )
            }
        </>
    )
}