import { useState } from 'react'
import styles from './index.module.css'
import Message from '../message'
import btn from '../button/index.module.css'
import taskListService from '../../services/taskListService'

export default function TaskListForm (props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

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
        } 
        else if(!color) {
            setErrorMessage('Escolha uma cor para sua lista!')
            
            return
        } else {
            const params = {name, color}
    
            const {status} = await taskListService.newTaskList(params)
            
            handleReset()

            if(status === 200) {
                props.handleGetTaskLists()
                setSuccessMessage('Lista de tarefas criada com sucesso!')
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 3000);
                setErrorMessage('')
            } else {
                setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
            }
        }
    }

    const handleTaskListUpdate = async (ev) => {
        ev.preventDefault()

        const {id} = ev.currentTarget

        const formData = new FormData(ev.currentTarget)
        const name = formData.get('taskListName')
        const color = formData.get('color')
        
        const data = {name, color}

        Object.keys(data).forEach(key => data[key] == null || data[key] == '' && delete data[key])

        const params = {id, data}

        const {status} = await taskListService.updateTaskList(params)

        handleReset()

        if(status === 200) {
            props.handleGetTaskLists()
            setErrorMessage('')
            setSuccessMessage('Lista de tarefas atualizada com sucesso!')
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 3000);
        } else {
            setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
        }
    }
    

    return (
        <>
        <section className={styles.container}>
        <form id={props.formId} method={props.methodPost ? 'post' : 'put'} className={props.methodPost ? styles.postForm : styles.putForm} onSubmit={props.methodPost ? handleTaskListSubmit : handleTaskListUpdate}>
                <label htmlFor="taskListName" className={styles.label}> <p className={props.methodPost ? styles.text : styles.editText}>{props.methodPost ? 'Nova Lista' : 'Editar Lista'}</p>
                    <input type="text" id='taskListName' name='taskListName' className={styles.input} placeholder='Insira o nome da lista' maxLength={30}/>
                </label>
                <br />
                <br />
                <p className={props.methodPost ? styles.text : styles.editText} >Escolha uma cor para a Lista</p>
                <div className={styles.colorSection}>
                    <span className={styles.radio}>
                        <label style={{backgroundColor:'#9be8d8'}}>
                            <input type="radio" name="color" value='#9be8d8' />
                        </label>
                    </span>
                    <span className={styles.radio}>
                        <label style={{backgroundColor:'#cbffa9'}}>
                            <input type="radio" name="color" value='#cbffa9' />
                        </label>
                    </span>
                    <span className={styles.radio}>
                        <label style={{backgroundColor:'#fae392'}}>
                            <input type="radio" name="color" value='#fae392' />
                        </label>
                    </span>
                    <span className={styles.radio}>
                        <label style={{backgroundColor:'#e8d3b6'}}>
                            <input type="radio" name="color" value='#e8d3b6' />
                        </label>
                    </span>
                    <span className={styles.radio}>
                        <label style={{backgroundColor:'#f7b37c'}}>
                            <input type="radio" name="color" value='#f7b37c' />
                        </label>
                    </span>
                </div>
                <button type='submit' className={props.methodPost ? btn.btn : styles.editBtn}><p className={props.methodPost ? styles.text : styles.editText}>{props.methodPost ? 'CRIAR' : 'SALVAR'}</p></button>
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
        </>
    )
}