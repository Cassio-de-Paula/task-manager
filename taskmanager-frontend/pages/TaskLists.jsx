import { Link } from "react-router-dom"
import { taskListHook } from "../hooks/getTaskLists"
import { useEffect, useState } from "react"
import styles from '../styles/TaskLists.module.css'
import taskListService from "../src/services/taskListService"
import ErrorMessage from '../src/components/errorMessage'
import taskService from "../src/services/taskService"
import { tasksHook } from "../hooks/getTasks"

export default function TaskLists() {
    const [showTaskLists, setShowTaskLists] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [message, setMessage] = useState(false)
    
    
    const handleReset = () => {
        Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
    }

    const handleTaskListSubmit = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskListName')
        const color = formData.get('color')

        if(!name || name === '') {
            setErrorMessage('Insira um nome para sua lista!')

            return
        } 
        else if(!color) {
            setErrorMessage('Escolha uma cor para sua lista!')
            
            return
        } else {
            const params = {name, color}
    
            const {status} = await taskListService.newTaskList(params)
            
            handleReset()

            if(status === 200) {
                handleGetTaskLists()
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }
    }

    const handleGetTaskLists = async () => {
        const data = await taskListHook.taskLists()

        if(!data) {
            setMessage(true)
        } else {
            setShowTaskLists(data)
        }

        return data
    }

    const handleEditTaskList = () => {
        setShowEditForm(true)
    }

    const handleDeleteTaskList = async (ev) => {
        ev.preventDefault()
        let id = Number(ev.target.id)

        const data = await tasksHook.tasks(id)

        console.log(data.length)
        
        if(data.length === 0) {
            const taskListResponse = await taskListService.removeTaskList(+id)

            if(taskListResponse.status === 200) {
                handleGetTaskLists()
            } else {
                setErrorMessage('Oops, parece que algo deu errado!')
            }

        } else {
            const taskResponse = await taskService.removeAllTasks(id)

            if(taskResponse.status === 200) {
                const taskListResponse = await taskListService.removeTaskList(id)
    
                if(taskListResponse.status === 200) {
                    handleGetTaskLists()
                } else {
                    setErrorMessage('Oops, parece que algo deu errado!')
                }
            }
        }
        

    }


    useEffect(() => {
        handleGetTaskLists()
    }, [])

    

    return (
        <>
        <div className={styles.container}>
        <form method='post' className={styles.formContainer} onSubmit={handleTaskListSubmit}>
                <label htmlFor="taskListName" className={styles.label}> Nova Lista de Tarefas
                    <input type="text" id='taskListName' name='taskListName' className={styles.input}/>
                </label>
                <br />
                <br />
                <p className={styles.text}>Escolha uma cor para a Lista</p>
                <div className={styles.colorSection}>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#cbffa9'}}>
                            <input type="radio" name="color" value='#cbffa9' />
                        </label>
                    </div>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#fae392'}}>
                            <input type="radio" name="color" value='#fae392' />
                        </label>
                    </div>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#9be8d8'}}>
                            <input type="radio" name="color" value='#9be8d8' />
                        </label>
                    </div>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#e76161'}}>
                            <input type="radio" name="color" value='#e76161' />
                        </label>
                    </div>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#a9907e'}}>
                            <input type="radio" name="color" value='#a9907e' />
                        </label>
                    </div>
                </div>
                <button type='submit' className={styles.taskListForm}>CRIAR</button>
                </form>
                {
                    errorMessage ? (
                        <div className={styles.error}>
                            <ErrorMessage message={errorMessage}/>
                        </div>
                    ) : (
                        <>
                        </>
                    )
                }
        </div>
           {
               message ? (
                   <p className={styles.message}>Pelo visto você ainda não possui nenhuma lista de tarefas <br /> cire sua primeira lista usando a caixa ao lado!</p>
            ) : (
                <div className={styles.taskListsContainer}>
                    {
                    showTaskLists.map((taskList) => (
                        <div className={styles.taskListContainer} key={taskList.id} style={{backgroundColor:`${taskList.color}`}}>
                            <Link to={`${taskList.id}`}> 
                            <p className={styles.taskListName}>{taskList.name}</p>
                            </Link>
                            <div className={styles.btnContainer}>
                                <button id={taskList.id} className={styles.deleteBtn} onClick={handleDeleteTaskList}>EXCLUIR</button>
                                <button id={taskList.id} className={styles.editBtn} onClick={handleEditTaskList}>EDITAR</button>
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