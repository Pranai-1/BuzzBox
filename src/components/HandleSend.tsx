import axios from "axios";

const HandleSend = async (obj:any) => {
   const{textToSend,userIdOfOpenedChat,id,setMessages,openedChatId,socket,setTextToSend}=obj
    if (textToSend.length !== 0 && userIdOfOpenedChat!=0) {
      const message={
        senderId:id,
        receiverId:userIdOfOpenedChat,
        text:textToSend
      }
      const response=await axios.post("/api/messages",message)
   
      setMessages((prev: any)=>({
        ...prev,
        [openedChatId]: [
          ...(prev[openedChatId] || []),
          message 
        ]
      }));
    if(socket)
      socket.emit("sendMessage",{messagetosend:message,userIdOfOpenedChat})
      setTextToSend("");
    }
 
}

export {HandleSend}