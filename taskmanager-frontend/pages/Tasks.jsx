import { useParams } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'
import { useEffect, useState } from 'react'
import TaskForm from '../src/components/taskForm'
import { dateFormat, tasksHook } from '../hooks/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck , faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import taskService from '../src/services/taskService'


export default function Tasks () {
    const {taskListId} = useParams()

    const [postMethod, setPostMethod] = useState(true)
    const [errorMessage, setErrorMessage] = useState(false)
    const [message, setMessage] = useState(false)
    const [showTasks, setShowTasks] = useState([])
    const [formId, setFormId] = useState('')

    const handleGetTasks = async () => {
        const data = await tasksHook.tasks(taskListId)

        if(!data) {
            setMessage(true)
        } else {
            setShowTasks(data)
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
            } else {
                setErrorMessage(true)
            }

        } else {
            const params = {id, done: true}
            const {status} = await taskService.updateTask(taskListId, params)
            if(status === 200) {
                handleGetTasks()
            } else {
                setErrorMessage(true)
            }
        }
    }

    const handleDeleteTask = async (ev) => {
        let {id} = ev.currentTarget

        const {status} = await taskService.removeTask(taskListId, id)

        if(status === 200) {
            handleGetTasks()
        } else {
            setErrorMessage(true)
        }
    }

    const handleEditScreen = (ev) => {
        let {id} = ev.currentTarget

        setPostMethod(false)
        setFormId(id)
    }

    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <>
        <TaskForm postMethod={postMethod} handleGetTasks={handleGetTasks} taskListId={formId} errorMessage={errorMessage}/>
            {
                message ? (
                    <p className={styles.message}>Parece que você ainda não possui tarefas <br /> crie uma usando a caixa ao lado!</p>
                ) : (
                    <div className={styles.tasksContainer}>
                        {
                            showTasks.map((task) => (
                                <div className={task.done ? styles.done : styles.taskContainer} key={task.id}>
                                    <p className={task.done ? styles.taskDone : styles.taskText}>{task.name}</p>
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
                                        <button className={task.done ? styles.checked : styles.tool} id={task.id} onClick={handleTaskDone}><FontAwesomeIcon icon={faCheck}/></button>
                                        <button className={styles.tool} id={task.id} onClick={handleEditScreen}><FontAwesomeIcon icon={faPencil}/></button>
                                        <button className={styles.tool} id={task.id} onClick={handleDeleteTask}><FontAwesomeIcon icon={faTrash}/></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}