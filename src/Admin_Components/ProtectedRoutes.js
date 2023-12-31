import React from 'react'
import { Navigate } from 'react-router-dom'
import AdminNav from '../layout/AdminNav';
const ProtectedRoutes = ({children}) => {
    if(localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to ="/login"/>;
    }
    
 
}

export default ProtectedRoutes
