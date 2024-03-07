import { RoomMessage, RoomMessageType } from "@/pages/api/types";
import { v4 as uuidv4 } from 'uuid';
export default function RenderRoomMessages({roomMessages,openedRoomId,id}:{roomMessages:RoomMessageType,openedRoomId:number,id:number}){
  const uniqueKey = uuidv4();
    const currentRoomMessages = roomMessages[openedRoomId] || [];
   console.log(currentRoomMessages)
    return currentRoomMessages.map((message: any, index: number) => {
      const uniqueKey = uuidv4();
      const isSentByYou = message.senderId === id;
      return (
      (isSentByYou ? (
        <p key={uniqueKey} className="font-medium text-orange-600 ml-auto mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
      ):(
      <div key={uniqueKey} className="flex flex-col">
         <p  className=" text-gray-400 ml-2 mr-2  h-max w-max  ">
        sent by:{message.senderId}
      </p>
        <p  className="font-medium text-blue-600 ml-2 mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
     
      </div>
      ))          
      );
    });
}