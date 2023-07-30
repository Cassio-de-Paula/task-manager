import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from '../styles/TaskLists.module.css'
import btn from '../src/components/button/index.module.css'
import taskListService from "../src/services/taskListService"
import taskService from "../src/services/taskService"
import { tasksHook, taskListHook } from "../hooks/hooks"
import TaskListForm from "../src/components/taskListForm"

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

    const handleEditScreen = (ev) => {
        let {id} = ev.currentTarget

        if(methodPost) {
            setMethodPost(false)
        } else {
            setMethodPost(true)
        }

        setTaskListId(id)
    }

    const handleDeleteTaskList = async (ev) => {
        ev.preventDefault()
        let id = Number(ev.target.id)

        const data = await tasksHook.tasks(id)
        
        if(data.length === 0) {
            const taskListResponse = await taskListService.removeTaskList(+id)

            if(taskListResponse.status === 200) {
                handleGetTaskLists()
            }

        } else {
            const taskResponse = await taskService.removeAllTasks(id)

            if(taskResponse.status === 200) {
                const taskListResponse = await taskListService.removeTaskList(id)
    
                if(taskListResponse.status === 200) {
                    handleGetTaskLists()
                }
            }
        }
        

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
                <section className={styles.taskListsContainer}>
                    {

                    showTaskLists.map((taskList) => (
                        <div className={styles.taskListContainer} key={taskList.id} style={{backgroundColor:`${taskList.color}`}}>
                            <Link to={`${taskList.id}/tasks`}> 
                            <button className={btn.btn}><p className={styles.text}>{taskList.name}</p></button>
                            </Link>
                            <p className={styles.text}>
                               {`Você possui ${taskList.taskCounter} tarefas nessa lista`}
                            </p>
                            <div className={styles.btnContainer}>
                                <button id={taskList.id} className={styles.deleteBtn} onClick={handleDeleteTaskList}>EXCLUIR</button>
                                <button id={taskList.id} className={styles.editBtn} onClick={handleEditScreen}>EDITAR</button>
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