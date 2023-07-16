import styles from './index.module.css'
import Logo from '../logoComponent'
import '../logoComponent/index.module.css'
import { useEffect, useState } from 'react'
import taskListService from '../../services/taskListService'
import taskService from '../../services/taskService'

export default function Header () {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <>
        <header className={styles.header}>
            <a href="/home">
            <Logo className={styles.logo}/>
            </a>
            <div className={styles.inputContainer}>
              <input type="text" name='searchBar' className={styles.searchInput}/>
            </div>
            
             <div className={styles.userProfile}>
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