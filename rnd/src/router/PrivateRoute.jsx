import React from 'react'
import { useAuth } from '../contextapi/AuthContext'
import { Navigate } from 'react-router-dom';

function PrivateRoute({children , allowedRoles}) {

    const { user } = useAuth();

    if(!user) {
        return <Navigate to="/"></Navigate>
    }

    if (!allowedRoles.includes(user.role)) {
    return <h1>Yetkiniz yok!</h1>;
  }
  

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute