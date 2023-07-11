import { createBrowserRouter } from 'react-router-dom'
import HomeNoAuth from './components/homeNoAuth'
import LoginScreen from '../pages/Login'
import RegisterScreen from '../pages/Register'
import Home from '../pages/Home'

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
        element: <Home/>
    }
])

export default router