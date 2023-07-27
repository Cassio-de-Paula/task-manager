import styles from '../styles/Login.module.css'
import LogoName from '../src/components/logoName'
import { useState } from 'react'
import authService from '../src/services/authService'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../src/components/errorMessage'

export default function LoginScreen () {
    const router = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const email = formData.get('email').toString()
        const password = formData.get('password').toString()

        const params = {email, password}

        const {status} = await authService.login(params)

        if(status === 200) {
            router('/home',{replace: true})

        } else {
            setErrorMessage('Usuário inválido!')
        }
    }

    return (
        <>
        <div className={styles.homeContainer}>
            <LogoName />
        <div className={styles.formContainer}>
            <form method="post" className={styles.form} onSubmit={handleLogin}>
                <label htmlFor="email" className={styles.label}> <p>Email</p>
                    <input type="email" name='email' placeholder='Digite seu email' className={styles.input}/>
                </label>
                <label htmlFor="password" className={styles.label} > <p>Senha</p>
                    <input type="password" name='password' placeholder='Digite sua senha' className={styles.input}/>
                </label>
                <button type='submit'>ENTRAR!</button>
            </form>
        </div>
        {
            errorMessage ? (
                <ErrorMessage message={errorMessage}/>
            ) : (
                <>
                </>
            )
        }
        </div>
        </>
    )
}