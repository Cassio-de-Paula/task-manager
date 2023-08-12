import styles from '../styles/Login.module.css'
import btn from '../src/components/button/index.module.css'
import LogoName from '../src/components/logoName'
import { useEffect, useState } from 'react'
import authService from '../src/services/authService'
import { useNavigate } from 'react-router-dom'
import Message from '../src/components/message'
import Aos from 'aos'

export default function LoginScreen () {
    const router = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleLogin = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const email = formData.get('email').toString()
        const password = formData.get('password').toString()

        const params = {email, password}

        const {status} = await authService.login(params)

        if(status === 200) {
            setSuccessMessage('Login efetuado com sucesso, Bem-vindo!')
            setTimeout(() => {
                router('/home')
            }, 1500);
        } else {
            setErrorMessage('Usuário inválido!')
            setTimeout(() => {
                setErrorMessage('')
            }, 1500);
        }
    }

    useEffect(() => {
        Aos.init()
    },[])

    return (
        <>
        <main className={styles.homeContainer}>
            <section className={styles.container} data-aos='zoom-in' data-aos-duration='1500'>
            <LogoName />
            <div className={styles.formContainer}>
                <form method="post" className={styles.form} onSubmit={handleLogin}>
                    <label htmlFor="email" className={styles.label}> <p>Email</p>
                        <input type="email" name='email' placeholder='Digite seu email' className={styles.input}/>
                    </label>
                    <label htmlFor="password" className={styles.label} > <p>Senha</p>
                        <input type="password" name='password' placeholder='Digite sua senha' className={styles.input}/>
                    </label>
                    <button type='submit' className={btn.btn}><p>ENTRAR</p></button>
                </form>
            </div>
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
                )   :     (
                    <>
                    </>
                )
            }
            </section>
        </main>
        </>
    )
}