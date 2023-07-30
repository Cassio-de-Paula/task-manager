import styles from '../styles/Register.module.css'
import btn from '../src/components/button/index.module.css'
import authService from '../src/services/authService'
import LogoName from '../src/components/logoName'
import Message from '../src/components/message'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Aos from 'aos'

export default function RegisterScreen () {
    const router = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleRegister = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const userName = formData.get('username').toString()
        const email = formData.get('email').toString()
        const birth = formData.get('birthday').toString()
        const password = formData.get('password').toString()
        const confirmPassword = formData.get('confirmPassword').toString()

        if(!userName || !email || !birth || !password || !confirmPassword) {
            setErrorMessage('Oops, preencha todos os campos para criar sua conta!')
            return
        }

        const params = {userName, email, birth, password}

        if(password !== confirmPassword) {
            setErrorMessage('Sua senha e confirmação de senha estão diferentes!')
            return
        }

        const {status} = await authService.register(params)

        if(status === 200) {
           setSuccessMessage('Registro efetuado com sucesso, faça login para prosseguir!')

           setTimeout(() => {
            router('/login',{replace: true})
           }, 3000);
        }
    }

    useEffect(() => {
        Aos.init()
    },[])

    return (
        <>
        <main className={styles.homeContainer}>
            <div className={styles.container} data-aos='zoom-in' data-aos-duration='1500'>
                <LogoName/>
                <section className={styles.formContainer}>
                <form method="post" className={styles.form} onSubmit={handleRegister}>
                    <label htmlFor="username" className={styles.label}> <p>Nome de usuário</p> 
                        <input type="text" id='username' name='username' placeholder='Digite seu nome de usuário' className={styles.input}/>
                    </label>
                    <label htmlFor="email" className={styles.label}> <p>Email</p>
                        <input type="email" id='email' name='email' placeholder='Digite seu email' className={styles.input}/>
                    </label>
                    <label htmlFor="birthday" className={styles.label}> <p>Nascimento</p>
                        <input type="date" id='birthday' name='birthday' className={styles.input}/>
                    </label>
                    <label htmlFor="password" className={styles.label}> <p>Senha</p>
                        <input type="password" id='password' name='password' placeholder='Digite sua senha' className={styles.input}/>
                    </label>
                    <label htmlFor="confirmPassowrd" className={styles.label}> <p>Confirmaçao da senha</p>
                        <input type="password" id='confirmPassword' name='confirmPassword' placeholder='Confirme sua senha' className={styles.input}/>
                    </label>
                
                    <button type='submit' className={btn.btn}><p>CADASTRAR</p></button>
                </form>
            </section>
            {
                errorMessage ? (
                    <Message message={errorMessage} error={true}/>
                )   :  (
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
            </div>
       
        </main>
        </>
    )
}