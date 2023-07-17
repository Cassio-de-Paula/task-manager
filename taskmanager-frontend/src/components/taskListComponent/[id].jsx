import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import ErrorMessage from '../errorMessage'
import taskService from '../../services/taskService'
import { tasksHook } from '../../../hooks/getTasks'
import dateFormat from '../../../hooks/dateFormat'

export default function TaskList () {
    const {id} = useParams()
    const router = useNavigate()

    const [errorMessage, setErrorMessage] = useState(false)
    const [message, setMessage] = useState(false)
    const [showTasks, setShowTasks] = useState([])
    const [rangeValue, setRangeValue] = useState(0)

    const handleTaskSubmit = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskName')
        const deadline = formData.get('deadline')
        const urgency = formData.get('urgency')

        if(!name || name === '') {
            setErrorMessage('Insira um nome para sua tarefa!')

            return
        } else {
            const params = {name, deadline, urgency}

            console.log(params)
                
            const {status} = await taskService.newTask(+id, params)

            console.log(status)
    
            if(status === 200) {
                handleTasks()
    
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }

        
    }

    const handleTasks = async () => {
        const data = await tasksHook.tasks(id)
        console.log(data)
        if(!data) {
            setMessage(true)
        } else {
            setShowTasks(data)
        }
    }

    useEffect(() => {
        handleTasks()
    }, [])

    return (
        <>
        <div className={styles.formContainer}>
        <form method='post' className={styles.taskForm} onSubmit={handleTaskSubmit}>
                <label className={styles.label}> Nova Tarefa
                    <input type="text" name='taskName' className={styles.input}/>
                </label>
                <label className={styles.label}> Prazo 
                    <input type="date"  name='deadline' className={styles.input}/>
                </label>
                <label className={styles.label}> Aviso
                    <input type="range" min={0} max={15} name='urgency' className={styles.range} onInput={(ev) => {setRangeValue(ev.currentTarget.value)}}/>
                    <span>{rangeValue}</span>
                    <p className={styles.description}>Informe quantos dias antes do prazo <br /> você gostaria de ser avisado desta tarefa</p>
                </label>
                <button type='submit' className={styles.taskFormBtn}>CRIAR</button>
                </form>
                {
                    errorMessage ? (
                        <div>
                            <ErrorMessage message={errorMessage}/>
                        </div>
                    ) : (
                        <>
                        </>
                    )
                }
        </div>
        <div className={styles.container}>
            {
                message ? (
                    <p className={styles.message}>Parece que você ainda não possui tarefas <br /> crie uma usando a caixa ao lado!</p>
                ) : (
                    <div className={styles.tasksContainer}>
                        {
                            showTasks.map((task) => (
                                <div className={styles.taskContainer} key={task.id}>
                                    <p className={styles.taskText}>{task.name}</p>
                                    <p className={styles.taskDate}>{dateFormat(task.deadline)}</p>
                                    <p className={styles.taskUrgency}>Aviso {task.urgency} dias antes</p>
                                    <div className={styles.taskBtnContainer}>
                                        <button></button>
                                        <button></button>
                                        <button></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
        </>
    )
}