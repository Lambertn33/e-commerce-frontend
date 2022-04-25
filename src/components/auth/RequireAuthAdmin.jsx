import React from 'react'
import { Navigate } from 'react-router-dom'
import auth from '../services/authService'

export default function RequireAuthAdmin({children}) {
    let currentUser = auth.getCurrentUser()
    if(currentUser && currentUser.is_admin){
        return children
    }else{
      return <Navigate to="/" />
    }
}
