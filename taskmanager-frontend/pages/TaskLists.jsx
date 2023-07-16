import { Link, useNavigate } from "react-router-dom"
import { taskListHook } from "../hooks/getTaskLists"
import { useEffect, useState } from "react"
import styles from '../styles/TaskLists.module.css'
import ErrorMessage from "../src/components/errorMessage"
import taskListService from "../src/services/taskListService"


export default function TaskLists() {
    const router = useNavigate()

    const [message, setMessage] = useState(false)
    const [showTaskLists, setShowTaskLists] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

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

            console.log(params)
    
            const {status} = await taskListService.newTaskList(params)
    
            if(status === 200) {
                handleTaskLists()
    
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }
    }

    const handleTaskLists = async () => {
        const data = await taskListHook.taskLists()
        
        if(!data) {
            setMessage(true)
        } else {
            setShowTaskLists(data)
        }

        console.log('handle chamado...')
    }

    useEffect(() => {
        handleTaskLists()
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
                <p>Escolha uma cor para a Lista</p>
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
        <div className={styles.taskListsContainer}>
           {
            message ? (
                <p className={styles.message}>Pelo visto você ainda não possui nenhuma lista de tarefas <br /> cire sua primeira lista usando a caixa ao lado!</p>
            ) : (
                    showTaskLists.map((taskList) => (
                        <Link to={`${taskList.id}`}> 
                        <div className={styles.taskList} key={taskList.id} style={{backgroundColor:`${taskList.color}`}}>
                            <p className={styles.taskListName}>{taskList.name}</p>
                        </div>
                        </Link>
                ))
            )
           }
        </div>
        </>
    )
}