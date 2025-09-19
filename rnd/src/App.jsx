
import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/AppRouter';
import { AuthProvider } from "./contextapi/AuthContext";
import { MessageProvider } from './contextapi/MessageContext';
import { AppointmentProvider } from './contextapi/AppointmentContext';

function App() {


  return (
    <>
    <AuthProvider>
      <MessageProvider>
        <AppointmentProvider>
      <BrowserRouter>
      <AppRouter/>
      </BrowserRouter>
      </AppointmentProvider>
      </MessageProvider>
    </AuthProvider>
    </>
  )
}

export default App
