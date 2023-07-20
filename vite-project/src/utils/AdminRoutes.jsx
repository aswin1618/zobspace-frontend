import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AdminRoutes = () => {
  const {user} = useContext(AuthContext)
  
  return (
    user.su_status ? <Outlet /> : <Navigate to='/' />
  )
}
export default AdminRoutes  