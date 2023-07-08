import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './styles/App.module.css'
import Header from './components/common/header'

function App() {
  const router = useRouter()

  return (
    <>
      <div className={styles.mainContainer}>
        <Header/>
      </div>
    </>
  )
}

export default App
