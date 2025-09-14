import { createContext, useContext , useState } from "react";
import axios from "axios";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
 const [user , setUser] = useState();

 const login = async(username , password) =>{

    const response = await axios.get(`http://localhost:3001/users?username=${username}&password=${password}`);

    if(response.data.length > 0){
        const foundUser = response.data[0];
        setUser(foundUser);
          localStorage.setItem("user" , JSON.stringify(foundUser));
          return { success : true , role: foundUser.role};

    }
    else {
        return { success : false};
    }
   }

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    };




    return (
        <AuthContext.Provider value={{user , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
