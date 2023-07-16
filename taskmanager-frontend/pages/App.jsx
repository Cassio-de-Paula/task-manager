import router from '../src/routes'
import { Outlet, RouterProvider } from 'react-router-dom'

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
