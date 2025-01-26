import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {
   //get user data from local storage
   const user = JSON.parse(localStorage.getItem('userData'))

   return user != null ?
   <Outlet/> : <Navigate to={'/login'}/>

}

export default UserRoutes
