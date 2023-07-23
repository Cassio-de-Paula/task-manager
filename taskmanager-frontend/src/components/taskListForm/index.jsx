import { useState } from 'react'
import styles from './index.module.css'
import ErrorMessage from '../errorMessage'
import taskListService from '../../services/taskListService'

export default function TaskListForm (props) {
    const [errorMessage, setErrorMessage] = useState(false)

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
                props.handleGetTaskLists()
                setErrorMessage(false)
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
            setErrorMessage(false)
        } else {
            setErrorMessage('Oops, algo deu errado, tente novamente mais tarde!')
        }
    }
    

    return (
        <>
        <div className={styles.container}>
        <form id={props.formId} method={props.methodPost ? 'post' : 'put'} className={props.methodPost ? styles.postForm : styles.putForm} onSubmit={props.methodPost ? handleTaskListSubmit : handleTaskListUpdate}>
                <label htmlFor="taskListName" className={styles.label}> {props.methodPost ? 'Nova Lista' : 'Editar Lista'}
                    <input type="text" id='taskListName' name='taskListName' className={styles.input} placeholder='Insira o nome da lista' maxLength={30}/>
                </label>
                <br />
                <br />
                <p className={styles.text}>Escolha uma cor para a Lista</p>
                <div className={styles.colorSection}>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#9be8d8'}}>
                            <input type="radio" name="color" value='#9be8d8' />
                        </label>
                    </div>
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
                        <label style={{backgroundColor:'#e8d3b6'}}>
                            <input type="radio" name="color" value='#e8d3b6' />
                        </label>
                    </div>
                    <div className={styles.radio}>
                        <label style={{backgroundColor:'#f7b37c'}}>
                            <input type="radio" name="color" value='#f7b37c' />
                        </label>
                    </div>
                </div>
                <button type='submit' className={styles.taskListFormBtn}>SALVAR</button>
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
        </>
    )
}