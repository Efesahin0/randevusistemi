import React from 'react'
import { useAuth } from '../contextapi/AuthContext'; // Update the path as needed

function ProfilePage() {

  const {user} = useAuth();

  return (
    <div>
        <h1> Profil Sayfası </h1>

        <div>
            <p> Adınız: {user.name} </p>
            <p> Soyadınız: {user.surname} </p>
            <p> E-posta: {user.email} </p>
            <p> Rol: {user.role} </p>
        </div>



    </div>
  )
}

export default ProfilePage