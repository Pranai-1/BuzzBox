export default function HandleRoomSend(obj:any)  {
    let{socket,setTextToSend,openedRoomId,setRoomMessages,textToSend,id}=obj
    if (textToSend.length !== 0 && openedRoomId!=0) {
      const message={
        senderId:id,
        roomId:openedRoomId,
        text:textToSend
      }
      setRoomMessages((prev: any)=>({
        ...prev,
        [openedRoomId]: [
          ...(prev[openedRoomId] || []),
          message 
        ]
      }));
    if(socket)
      socket.emit("sendRoomMessage",{messagetosend:message,roomId:openedRoomId})
      setTextToSend("");
    }
  
  }
  