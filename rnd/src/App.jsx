
import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/AppRouter';
import { AuthProvider } from "./contextapi/AuthContext";

function App() {


  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <AppRouter/>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
