import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from '../styles/TaskLists.module.css'
import btn from '../src/components/button/index.module.css'
import taskListService from "../src/services/taskListService"
import taskService from "../src/services/taskService"
import { tasksHook, taskListHook } from "../hooks/hooks"
import TaskListForm from "../src/components/taskListForm"
import { TaskListsContainer } from "../src/components/container"

export default function TaskLists() {
    const [showTaskLists, setShowTaskLists] = useState([])
    const [taskListId, setTaskListId] = useState('')
    const [methodPost, setMethodPost] = useState(true)
    const [message, setMessage] = useState(false)

    const handleGetTaskLists = async () => {
        const data = await taskListHook.taskLists()

        if(!data) {
            setMessage(true)
        } else {
            setShowTaskLists(data)
        }

        if(!methodPost) {
            setMethodPost(true)
        }

        return data
    }

    const handleEditScreen = ({id}) => {
        if(methodPost) {
            setMethodPost(false)
        } else {
            setMethodPost(true)
        }

        setTaskListId(id)
    }

    useEffect(() => {
        handleGetTaskLists()
    }, [])

    

    return (
        <>
        <TaskListForm methodPost={methodPost} formId={taskListId} handleGetTaskLists={handleGetTaskLists}/>
           {
               message ? (
                   <p className={styles.message}>Pelo visto você ainda não possui nenhuma lista de tarefas <br /> cire sua primeira lista usando a caixa ao lado!</p>
            ) : (
                <TaskListsContainer taskList={showTaskLists} handleSearch={handleGetTaskLists} openForm={handleEditScreen}/>
                )
           }
        </>
    )
}