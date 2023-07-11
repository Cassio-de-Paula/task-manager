import router from '../src/routes'
import { RouterProvider } from 'react-router-dom'
import styles from '../styles/App.module.css'

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
