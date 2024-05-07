import React from 'react'
import { Navigate } from 'react-router'

function UserPrivate({children}) {
    const isLoggedIn = localStorage.getItem("loggedIn");

  return isLoggedIn === "true" ? children : <Navigate to="/gotologin"/>
  
}

export default UserPrivate