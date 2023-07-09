import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoute = () => {
    const staff = useSelector(state => state.staff)
    // alert(staff.auth)
    return (
        !staff.auth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute