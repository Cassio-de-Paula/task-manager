import { useState } from "react"
import ErrorMessage from '../errorMessage'
import styles from './index.module.css'
import taskService from "../../services/taskService"
import { useParams } from "react-router-dom"

export default function TaskForm(props) {
    const {taskListId} = useParams()

    const [rangeValue, setRangeValue] = useState(0)
    const [errorMessage, setErrorMessage] = useState(false)

    const handleReset = () => {
        Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
    }

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
            const data = {taskListId, name, deadline, urgency}

            Object.keys(data).forEach(key => data[key] == null || data[key] == '' && delete data[key])
                
            const {status} = await taskService.newTask(taskListId, data)
    
            if(status === 200) {
                props.handleGetTasks()
                handleReset()
    
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }

        
    }

    const handleTaskUpdate = async (ev) => {
        ev.preventDefault()
        const {id} = ev.currentTarget

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskName')
        const deadline = formData.get('deadline')
        const urgency = formData.get('urgency')

            const data = {id, name, deadline, urgency}

            Object.keys(data).forEach(key => data[key] == null || data[key] == '' && delete data[key])
                
            const {status} = await taskService.updateTask(taskListId, data)
    
            if(status === 200) {
                props.handleGetTasks()
                handleReset()
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }

    return (
        <div className={styles.container}>
        <form id={props.taskListId} method={props.postMethod ? 'post' : 'put'} className={props.postMethod ? styles.postForm : styles.putForm} onSubmit={props.postMethod ? handleTaskSubmit : handleTaskUpdate}>
                <label className={styles.label}> {props.postMethod ? 'Nova Tarefa' : 'Editar Tarefa'}
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
                <button type='submit' className={styles.taskFormBtn}><p className={styles.text}>{props.postMethod ? 'CRIAR' : 'SALVAR'}</p></button>
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
    )
}