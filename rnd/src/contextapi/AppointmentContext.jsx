import { createContext, useContext , useState } from "react";
import axios from "axios";

const AppointmentContext = createContext();

export const AppointmentProvider = ({children})=>{

    const [appointments, setAppointments] = useState([]);


    const getAllAppointments = async ()=>{
        const response = await axios.get("http://localhost:3001/randevular");
        setAppointments(response.data);
        return response.data;

    }

    const addAppointment = async()=>{
        const response = await axios.post("http://localhost:3001/randevular");
        setAppointments([...appointments, response.data]);
        return response.data;   
    


    }

    const deleteAppointment = async (id) => {
        await axios.delete(`http://localhost:3001/randevular/${id}`);
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    }

    return (
        <AppointmentContext.Provider value={{appointments, getAllAppointments, addAppointment, deleteAppointment}}>
            {children}
        </AppointmentContext.Provider>
    )

}

export const useAppointments = () => useContext(AppointmentContext);

export default AppointmentContext;