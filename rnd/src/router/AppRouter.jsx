import React from 'react'
import LoginPage from '../pages/LoginPage'
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import MainLayout from '../layout/Mainlayout';

import ProfilePage from '../pages/ProfilePage';
import PatientsPage from '../pages/PatientsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import DoctorMainPage from '../pages/DoctorMainPage';
import Messages from '../pages/Messages';
import SendMessage from '../pages/SendMessage';
import PatientMainPage from '../pages/PatientMainPage';
import AddAppointmentPage from '../pages/AddAppointmentPage';
import CalenderPage from '../pages/CalenderPage';

function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path='/' element ={<LoginPage/>}></Route>
              {/* Doctor routes */}
              
            <Route
                element={
                <PrivateRoute allowedRoles={["doctor"]}>
                    <MainLayout />
                </PrivateRoute>
                }
            >
                <Route path='/doctor' element={<DoctorMainPage/>}/>
                <Route path="/doctor/profile" element={<ProfilePage />} />
                <Route path="/doctor/patients" element={<PatientsPage />} />
                <Route path="/doctor/reports" element={<div>Raporlar</div>} />
                <Route path="/doctor/messages" element={<Messages/>} />
                <Route path="/doctor/takvim" element={<CalenderPage/>} />
            </Route>
                    
                    
                {/* Patient routes */}
                <Route
                    element={
                    <PrivateRoute allowedRoles={["patient"]}>
                        <MainLayout />
                    </PrivateRoute>
                    }
                >
                    <Route path='/patient' element={<PatientMainPage/>} />
                    <Route path="/patient/profile" element={<ProfilePage />} />
                    <Route path="/patient/appointments" element={<AppointmentsPage />} />
                    <Route path="/patient/add-delete-appointments" element={<AddAppointmentPage/>} />
                    <Route path="/patient/sendmessage" element={<SendMessage />} />
                </Route>
            
         
            
        </Routes>



    </div>
  )
}

export default AppRouter