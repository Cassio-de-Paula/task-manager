import { useEffect, useState } from 'react'
import styles from '../styles/Profile.module.css'
import userService from '../src/services/userService'
import Message from '../src/components/message'
import btn from '../src/components/button/index.module.css'

export default function Profile () {
    const [toggleName, setToggleName] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [userName, setUsername] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleReset = () => {
        Array.from(document.querySelectorAll('input')).forEach(input => input.value = '')
    }

    const handleToggle = () => {
        if(toggleName) {
            setToggleName(false)
        } else {
            setToggleName(true)
        }
    }

    const handleGetUserName = async () => {
        const {data} = await userService.getUser()

        setUsername(data.userName)
    }

    const handleUpdateName = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const userName = formData.get('name')

        if(!userName || userName === '') {
            setErrorMessage('Oops, o campo nome está vazio!')
        } else {

            const params = {userName}

            const {status} = await userService.updateUsername(params)
            
            if(status === 200) {
                handleGetUserName()
                handleReset()
            } else {
                setErrorMessage('Oops, parece que algo deu errado, tente novamente mais tarde!')
            }
        }
    }

    const handleUpdatePassword = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')

        if(!password || !confirmPassword) {
            setErrorMessage('Oops, os campos de senha e confirmação de senha devem ser preenchidos!')
        } else if (password !== confirmPassword) {
            setErrorMessage('A senha e confirmação devem ser iguais!')
        } else {
            const params = {password}

            const {status} = await userService.updatePassword(params)

            if(status === 200) {
                handleReset()
                setErrorMessage('')
                setSuccessMessage('Senha atualizada com sucesso!')
                setTimeout(() => {
                    setSuccessMessage('')
                }, 1500);
            } else {
                setErrorMessage('Oops, parece que algo deu errado!')
            }
        }
    }

    useEffect(() => {
        handleGetUserName()
    }, [userName])


    return (
        <>
        <section className={styles.userArea}>
            <span className={styles.message}>
                <h1>Olá</h1>
                <p className={styles.userName}>{userName}</p>
                <p className={styles.subtitle}>Aqui você pode alterar dados da sua conta como nome de usuário e senha</p>
            </span>
                <div className={toggleName ? styles.toggleBoxName : styles.toggleBoxPassword} onClick={handleToggle}>
                    <div className={toggleName ? styles.toggleName : styles.togglePassword}></div>
                    <p className={toggleName ? styles.toggleTagName : styles.toggleTagPassword}>{toggleName ? 'Nome' : 'Senha'}</p>
                </div>
        </section>
        <section className={styles.formContainer}>
            <form method='put' className={toggleName ? styles.updateName : styles.updatePassword} onSubmit={toggleName ? handleUpdateName : handleUpdatePassword}>
                <label htmlFor={toggleName ? 'name' : 'password'}> <p>{toggleName ? 'Nome' : 'Senha'}</p>
                    <input type={toggleName ? 'text' : 'password'} id={toggleName ? 'name' : 'password'} name={toggleName ? 'name' : 'password'} placeholder={toggleName ? 'Insira o nome de usuário' : 'Insira a nova senha'}/>
                </label> 
                {!toggleName ? (
                    <label htmlFor="confirmPassword"> <p>Confirme a senha</p>
                        <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirme a nova senha'/>
                    </label>
                ): (
                    <>
                    </>
                )}
                <button type='submit' className={btn.btn}><p>SALVAR</p></button>
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
                    <></>
                )
            }
        </section>
        </>
    )
}