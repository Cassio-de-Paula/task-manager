import { createBrowserRouter } from 'react-router-dom'
import HomeNoAuth from './components/homeNoAuth'
import LoginScreen from '../pages/Login'
import RegisterScreen from '../pages/Register'
import Home from '../pages/Home'
import TaskLists from '../pages/TaskLists'
import HomeComponent from './components/homeComponent'
import TaskList from './components/taskListComponent/[id]'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeNoAuth />
    },
    {
        path: '/register',
        element: <RegisterScreen />
    },
    {
        path: '/login',
        element: <LoginScreen />
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                index: true,
                element: <HomeComponent/>
            },
            {
                path: '/home/taskLists',
                element: <TaskLists/>,
            },
            {
                path: 'tasklists/:id',
                element: <TaskList/>
            }

        ]
    }
])

export default router