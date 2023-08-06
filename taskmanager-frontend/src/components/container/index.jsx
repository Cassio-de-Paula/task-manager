import { useEffect, useState } from 'react'
import styles from './index.module.css'
import taskService from '../../services/taskService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { dateFormat, tasksHook } from '../../../hooks/hooks'
import { Link } from 'react-router-dom'
import taskListService from '../../services/taskListService'

export function TaskListsContainer (props) {
    const [taskLists, setTaskLists] = useState([])
    const [isTaskListFormOpen, setIsTaskListFormOpen] = useState(false)

    const handleTaskListEditForm = (ev) => {
        let {id} = ev.currentTarget
        if(isTaskListFormOpen) {
            setIsTaskListFormOpen(false)
        } else {
            setIsTaskListFormOpen(true)
        }

        props.openForm({id, isTaskListFormOpen})
    }


    const handleDeleteTaskList = async (ev) => {
        ev.preventDefault()
        let {id} = ev.currentTarget

        const data = await tasksHook.tasks(id)
        
        if(data.length === 0) {
            const taskListResponse = await taskListService.removeTaskList(+id)

            if(taskListResponse.status === 200) {
                props.handleSearch()
            }

        } else {
            const taskResponse = await taskService.removeAllTasks(id)

            if(taskResponse.status === 200) {
                const taskListResponse = await taskListService.removeTaskList(id)
    
                if(taskListResponse.status === 200) {
                    props.handleSearch()
                }
            }
        }
        

    }

    useEffect(() => {
        setTaskLists(props.taskList)
    })

    return (
        <section className={styles.resultsContainer}>
                {
                    taskLists.map((taskList) => (
                        <div className={styles.taskListContainer} style={{backgroundColor:`${taskList.color}`}} key={taskList.id}>
                            <Link to={`/home/taskLists/${taskList.id}/tasks`}>
                            <p className={styles.title}>{taskList.name}</p>
                            </Link>
                            <p className={styles.description}>Você tem {taskList.taskCounter} tarefas nesta lista</p>
                            <span className={styles.btnContainer}>
                                <button className={styles.tool} id={taskList.id} onClick={handleTaskListEditForm}>
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
    )
}

export function TasksContainer (props) {
    const [tasks, setTasks] = useState([])
    const [taskIds, setTaskIds] = useState([])
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

    const handleTaskEditForm = (ev) => {
        let {id} = ev.currentTarget
        if(isTaskFormOpen) {
            setIsTaskFormOpen(false)
        } else {
            setIsTaskFormOpen(true)
        }

        props.openForm({id, isTaskFormOpen})
    }

    const handleTaskDone = async (ev) => {
        let {id} = ev.currentTarget
        let { className } = ev.currentTarget
        let {tasklist} = ev.currentTarget

        if(className == styles.checked) {
            const params = {id, done: false}
            const {status} = await taskService.updateTask(tasklist, params)
            if(status === 200) {
                props.handleSearch()
            }

        } else {
            const params = {id, done: true}
            const {status} = await taskService.updateTask(tasklist, params)
            if(status === 200) {
                props.handleSearch()
            }
        }
    }

    const handleDeleteTask = async (ev) => {
        let {id} = ev.currentTarget
        let {tasklist} = ev.currentTarget

        const {status} = await taskService.removeTask(tasklist, id)

        if(status === 200) {
            props.handleSearch()
        }
    }

    useEffect(() => {
        setTasks(props.task)
        setTaskIds(props.taskId)

    }, [props.task])

    return (
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
                            <button id={task.id} tasklist={task.taskListId} className={styles.tool} onClick={handleTaskEditForm}><FontAwesomeIcon icon={faPencil} color="#909090"/></button>
                            <button id={task.id} tasklist={task.taskListId} className={styles.tool} onClick={handleDeleteTask}><FontAwesomeIcon icon={faTrash} color="#909090"/></button>
                        </span>
                </div>
              ))
            }
        </section>
    )
}