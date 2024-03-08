import { ContactMessage, ContactMessageType, Send } from "@/pages/api/types";
import axios from "axios";

const HandleSend = async (obj:Send) => {
   const{textToSend,userIdOfOpenedChat,id,setMessages,openedChatId,socket,setTextToSend}=obj
    if (textToSend.length !== 0 && userIdOfOpenedChat!=0) {
      const message={
        senderId:id,
        receiverId:userIdOfOpenedChat,
        text:textToSend
      }
      const response=await axios.post("/api/messages",message)
   
      setMessages((prev: ContactMessageType)=>({
        ...prev,
        [openedChatId]: [
          ...(prev[openedChatId] || []),
          {
             ... message 
          } as ContactMessage
         
        ]
      }))

      
    if(socket)
      socket.emit("sendMessage",{messagetosend:message,userIdOfOpenedChat})
      setTextToSend("");
    }
 
}

export {HandleSend}