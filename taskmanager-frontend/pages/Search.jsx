import { useEffect, useState } from "react"
import { search } from '../hooks/hooks'
import styles from '../styles/Search.module.css'
import { useLocation } from "react-router-dom"
import taskService from "../src/services/taskService"
import TaskForm from "../src/components/taskForm"
import TaskListForm from "../src/components/taskListForm"
import { TaskListsContainer, TasksContainer } from '../src/components/container'

export default function SearchResults () {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const name = searchParams.get('name')

    const [tasks, setTasks] = useState([])
    const [taskLists, setTaskLists] = useState([])
    const [taskIds, setTaskIds] = useState([])
    const [showTaskListForm, setShowTaskListForm] = useState(false)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [formId, setFormId] = useState('')
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

    const handleOpenTaskForm = ({id, isTaskFormOpen}) => {
        setFormId(id)
        setShowTaskForm(isTaskFormOpen)
    }

    const handleOpenTaskListForm = ({id, isTaskListFormOpen}) => {
        setFormId(id)
        setShowTaskListForm(isTaskListFormOpen)
    }

    const handleCloseForm = () => {
        if(showTaskForm) {
            setShowTaskForm(false)
        } else if (showTaskListForm) {
            setShowTaskListForm(false)
        }
    }

    useEffect(() => {
        handleSearch()
        handleNotifications()
    }, [name, location])

    
    return (
        <>
        {
            taskListsMessage ? (
                <span className={styles.messageContainer}>
                    <p>{taskListsMessage}</p>
                </span>
            ) : (
                <TaskListsContainer taskList={taskLists} openForm={handleOpenTaskListForm} handleSearch={handleSearch}/>
            )
        }
        {
            tasksMessage ? (
                <span className={styles.messageContainer}>
                    <p>{tasksMessage}</p>
                </span>
            ) : (
                <TasksContainer task={tasks} taskId={taskIds} openForm={handleOpenTaskForm} handleSearch={handleSearch}/>
            )
        }
        {
            showTaskForm ? (
                <section className={styles.updateSection} onClick={handleCloseForm}>
                    <TaskForm/>
                </section>
            ) : (
                <>
                </>
            )
        }
        {
            showTaskListForm ? (
                <section className={styles.updateSection} onClick={handleCloseForm}>
                    <TaskListForm/>
                </section>
            ) : (
                <>
                </>
            )
        }
        </>
    )
}