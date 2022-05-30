import React from 'react'
import { Navigate } from 'react-router-dom'
import auth from '../services/authService'

export default function RequireAuth({children}) {
    let currentUser = auth.getCurrentUser()
    if(currentUser){
        return children
    }else{
      return <Navigate to="/" />
    }
}
