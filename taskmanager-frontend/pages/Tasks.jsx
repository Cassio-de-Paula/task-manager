import { useLocation, useParams } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'
import { useEffect, useState } from 'react'
import TaskForm from '../src/components/taskForm'
import { tasksHook } from '../hooks/hooks'
import taskService from '../src/services/taskService'
import { TasksContainer } from '../src/components/container'


export default function Tasks () {
    const {taskListId} = useParams()
    const location = useLocation()

    const [postMethod, setPostMethod] = useState(true)
    const [message, setMessage] = useState(false)
    const [showTasks, setShowTasks] = useState([])
    const [formId, setFormId] = useState('')
    const [formTaskListId, setFormTaskListId] = useState('')
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

    const handleEditScreen = ({id, taskListId}) => {
        if(postMethod) {
            setPostMethod(false)
        } else {
            setPostMethod(true)
        }
        setFormTaskListId(taskListId)
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
        <TaskForm postMethod={postMethod} formId={formId} handleGetTasks={handleGetTasks} taskListId={formTaskListId}/>
            {
                message ? (
                    <p className={styles.message}>Parece que você ainda não possui tarefas <br /> crie uma usando a caixa ao lado!</p>
                ) : (
                    <TasksContainer task={showTasks} taskId={taskIds} handleSearch={handleGetTasks} openForm={handleEditScreen}/>
                )
            }
        </>
    )
}