import React from 'react'
import { Navigate } from 'react-router'

function AdminPrivate({children}) {
    const isLoggedIn = localStorage.getItem("adminloggedIn");

  return isLoggedIn === "true" ? children : <Navigate to="/home/:email"/>
  
}

export default AdminPrivate