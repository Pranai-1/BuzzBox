import { ContactMessage, ContactMessageType } from "@/pages/api/types";
import styles from "../Contacts/[RenderContactMessages].module.css"
import { v4 as uuidv4 } from 'uuid';

export default function RenderContactMessages({messages,openedChatId,id}:{messages:ContactMessageType,openedChatId:number,id:number}){

const currentChatMessages = messages[openedChatId] || [];
     return currentChatMessages.map((message: ContactMessage, index: number) => {
      const uniqueKey = uuidv4(); 
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? 'text-orange-600 ml-auto mr-2' : 'text-blue-600 ml-2'; 
      return (
        <>
        <p key={uniqueKey} className={`font-medium ${messageClass} bg-black h-max w-max rounded-xl p-3 m-2  ${styles.container}`}>
          {message.text}
        </p>
        
        </>
      );
    });
}