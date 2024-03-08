import { ContactMessage, RoomMessage, RoomMessageType, RoomSend } from "@/pages/api/types";

export default function HandleRoomSend(obj:RoomSend)  {
    let{socket,setTextToSend,openedRoomId,setRoomMessages,textToSend,id}=obj
    if (textToSend.length !== 0 && openedRoomId!=0) {
      const message={
        senderId:id,
        roomId:openedRoomId,
        text:textToSend
      }
      setRoomMessages((prev: RoomMessageType) => ({
        ...prev,
        [openedRoomId]: [
          ...(prev[openedRoomId] || []),
          {
            ...message
          } as RoomMessage
        ]
      }));
    if(socket)
      socket.emit("sendRoomMessage",{messagetosend:message,roomId:openedRoomId})
      setTextToSend("");
    }
  
  }
  