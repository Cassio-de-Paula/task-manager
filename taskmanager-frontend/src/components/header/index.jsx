import styles from './index.module.css'
import Logo from '../logoComponent'
import '../logoComponent/index.module.css'
import { useEffect, useState } from 'react'
import taskListService from '../../services/taskListService'
import taskService from '../../services/taskService'

export default function Header () {
    const [showOptions, setShowOptions] = useState(false)

    const handleProfile = () => {
        if(showOptions) {
            setShowOptions(false)
        } else { 
            setShowOptions(true)
        }
    }

    async function checkTasks (id) {
        const tasks = await taskService.getTasks(id)

        console.log(tasks)
    }

    async function getNotifications() {
        const { data } = await taskListService.getTaskLists()

        console.log(data)
        
    }

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <>
        <header className={styles.header}>
            <a href="/home">
            <Logo className={styles.logo}/>
            </a>
            <div className={styles.inputContainer}>
              <input type="text" name='searchBar' className={styles.searchInput}/>
            </div>
            
             <div className={styles.userProfile} onClick={handleProfile}>
                {
                    showOptions ? (
                        <div className={styles.profileOptions}>
                            <a href="/myAccount">
                            <span>Minha Conta</span>
                            </a>
                            <span></span>
                        </div>
                    ) : (
                        <>
                        </>
                    )
                } 
             </div>
        </header>
        </>
    )
} 