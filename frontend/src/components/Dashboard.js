import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  React.useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [userInfo, navigate])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return userInfo ? (
    <div>
      <h2>Welcome, {userInfo.name}</h2>
      <p>Email: {userInfo.email}</p>
      {userInfo.isAdmin && <p>Role: Administrator</p>}
      <Button onClick={logoutHandler} variant="danger">
        Logout
      </Button>
    </div>
  ) : (
    <p>Please log in to view this page.</p>
  )
}

export default Dashboard
