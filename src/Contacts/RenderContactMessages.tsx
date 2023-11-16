import { ContactMessage, ContactMessageType } from "@/pages/api/types";

export default function RenderContactMessages({messages,openedChatId,id}:{messages:ContactMessageType,openedChatId:number,id:number}){
const currentChatMessages = messages[openedChatId] || [];
     return currentChatMessages.map((message: ContactMessage, index: number) => {
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? 'text-orange-600 ml-auto mr-2' : 'text-blue-600 ml-2'; 
      return (
        <p key={index} className={`font-medium ${messageClass} bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2`}>
          {message.text}
        </p>
        
      );
    });
}