import { useState } from "react"
import styles from './index.module.css'
import btn from '../button/index.module.css'
import taskService from "../../services/taskService"
import { useParams } from "react-router-dom"
import Message from '../message'

export default function TaskForm(props) {
    const {taskListId} = useParams()

    const [rangeValue, setRangeValue] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [addDateAndUrgency, setAddDateAndUrgency] = useState(false)

    const handleReset = () => {
        Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
    }

    const handleSetOptions = () => {
        if(addDateAndUrgency) {
            setAddDateAndUrgency(false)
        } else {
            setAddDateAndUrgency(true)
        }
    }

    const handleTaskSubmit = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskName')
        const getUrgency = formData.get('urgency')
        const getDate = formData.get('deadline')
        let deadline = null
        let urgency = null
        let data = {taskListId, name}
        const today = new Date()

        if(!name || name === '') {
            setErrorMessage('Insira um nome para sua tarefa!')
        } else {
            if(addDateAndUrgency) {
                const date = getDate ? new Date(getDate) : null
                urgency = getUrgency
                const difference = Math.round((date.getTime() - today.getTime())/(1000*60*60*24)) + 1


                if(date < today || date === null ) {
                    setErrorMessage('Insira uma data válida!')
                } else if (difference < (urgency)) {
                    setErrorMessage('Aviso inválido!')
                } else {
                    const utcYear = date.getUTCFullYear();
                    const utcMonth = date.getUTCMonth();
                    const utcDay = date.getUTCDate();
    
                    const localDate = new Date(utcYear, utcMonth, utcDay);
    
                    deadline = localDate

                    data = {taskListId, name, deadline, urgency}

                    const {status} = await taskService.newTask(taskListId, data)

                    if(status === 200) {
                        props.handleGetTasks()
                        handleReset()
                        setErrorMessage('')
                        setSuccessMessage('Tarefa criada com sucesso')
                        setTimeout(() => {
                            setSuccessMessage('')
                        }, 3000);
                        setAddDateAndUrgency(false)
                    } else {
                        setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
                    }
                }
            } else {
                const {status} = await taskService.newTask(taskListId, data)

                if(status === 200) {
                    props.handleGetTasks()
                    handleReset()
                    setErrorMessage('')
                    setSuccessMessage('Tarefa criada com sucesso!')
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 3000);
                    setAddDateAndUrgency(false)
                } else {
                    setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
                }
            }
        }
    }

    const handleTaskUpdate = async (ev) => {
        ev.preventDefault()
        const {id} = ev.currentTarget
        const taskList = ev.currentTarget.getAttribute('tasklist')

        console.log(id)

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskName')
        const urgency = formData.get('urgency')
        const getDate = formData.get('deadline')
        let deadline = null
        const today = new Date()

        if(addDateAndUrgency) {
            const date = getDate ? new Date(getDate) : null
            const difference = Math.round((date.getTime() - today.getTime())/(1000*60*60*24)) + 1

            if(date < today || date === null ) {
                setErrorMessage('Insira uma data válida ou desmarque a caixa!')

            } else if (difference < (urgency)) {
                setErrorMessage('Aviso inválido!')
            } else {

                const utcYear = date.getUTCFullYear();
                const utcMonth = date.getUTCMonth();
                const utcDay = date.getUTCDate();

                const localDate = new Date(utcYear, utcMonth, utcDay);

                deadline = localDate

                const data = {id, name, deadline, urgency}

                for (let key in data) {
                    if (data[key] === null || data[key] === '') {
                      delete data[key];
                    }
                  }

                const {status} = await taskService.updateTask(taskList, data)
    
                if(status === 200) {
                    props.handleGetTasks()
                    handleReset()
                    setErrorMessage('')
                    setSuccessMessage('Tarefa atualizada com sucesso!')
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 3000);
                    setAddDateAndUrgency(false)
                } else {
                    setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
                }
            }  
        } else {
            const data = {id, name, deadline, urgency}

            for (let key in data) {
                if (data[key] === null || data[key] === '') {
                  delete data[key];
                }
              }
            const {status} = await taskService.updateTask(taskList, data)
    
            if(status === 200) {
                props.handleGetTasks()
                handleReset()
                setErrorMessage('')
                setSuccessMessage('Tarefa atualizada com sucesso!')
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 3000);
                setAddDateAndUrgency(false)
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }
    }

    return (
        <section className={styles.container}>
        <form id={props.formId} tasklist={props.taskListId} method={props.postMethod ? 'post' : 'put'} className={props.postMethod ? styles.postForm : styles.putForm} onSubmit={props.postMethod ? handleTaskSubmit : handleTaskUpdate}>
                <label className={styles.label}> <p className={props.postMethod ? styles.text : styles.editText}>{props.postMethod ? 'Nova Tarefa' : 'Editar Tarefa'}</p>
                    <input type="text" name='taskName' className={styles.input} maxLength={15}/>
                </label>
                <button type='button' className={props.postMethod ? btn.btn : styles.editBtn} onClick={handleSetOptions}><p className={props.postMethod ? styles.text : styles.editText}>Adicionar prazo e aviso</p></button>
                {
                    addDateAndUrgency ? (
                    <>
                    <label className={styles.label}><p className={props.postMethod ? styles.text : styles.editText}>Prazo</p> 
                        <input type="date" name='deadline' className={styles.input}/>
                    </label>
                    <label className={styles.label}> <p className={props.postMethod ? styles.text : styles.editText}>Aviso</p>
                        <input type="range" min={0} max={15} name='urgency' className={styles.range} onInput={(ev) => {setRangeValue(ev.currentTarget.value)}}/>
                        <span className={props.postMethod ? styles.text : styles.editText}>{rangeValue}</span>
                        <p className={props.postMethod ? styles.description : styles.descriptionEdit}>Informe quantos dias antes do prazo <br /> você gostaria de ser avisado desta tarefa</p>
                    </label>
                    </>
                    ) : (
                        <>
                        </>
                    )
                }
                <button type='submit' className={props.postMethod ? btn.btn : styles.editBtn}><p className={props.postMethod ? styles.text : styles.editText}>{props.postMethod ? 'CRIAR' : 'SALVAR'}</p></button>
                </form>
                {
                    errorMessage ? (
                        <Message message={errorMessage} error={true}/>
                    ) : (
                        <>
                        </>
                    )
                }
                {
                    successMessage ? (
                        <Message message={successMessage} error={false}/>
                    ) : (
                        <>
                        </>
                    )
                }
        </section>
    )
}