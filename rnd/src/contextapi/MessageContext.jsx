import { createContext, useContext , useState , useEffect} from "react";
import axios from "axios";

const MessageContext = createContext();

export const MessageProvider = ({children})=>{
    const [messages , setMessages] = useState([]);

    const getAllMessages = async()=>{
        const response = await axios.get("http://localhost:3001/messages");
        setMessages(response.data);
    }

    const addMessage = async(newMessage)=> {
        try {
            
        const response = await axios.post("http://localhost:3001/messages" , newMessage);
        setMessages((prev)=>[...prev , response.data]);

        } catch (error) {
            console.error("Mesaj eklenirken hata oluştu" , error);
        }


    }

    useEffect(() => {
    getAllMessages();
    }, []);

    return (
        <MessageContext.Provider value={{messages , addMessage , getAllMessages}}>
            {children}
        </MessageContext.Provider>
    )



}

export const useMessages = () => useContext(MessageContext);
export default MessageContext;