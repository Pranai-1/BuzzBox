import { useEffect, useState } from "react";

export default function useGetDBMessages(obj: any) {
    const { userIdOfOpenedChat, id,setMessages,openedChatId } = obj;
    const getMessages = async () => {
      if (userIdOfOpenedChat !== 0) {
        let header = {
          senderId: id,
          receiverId: userIdOfOpenedChat
        };
        try {
          const response = await fetch("/api/messages", {
            headers: header
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          return data.messages;
        } catch (error) {
          console.error("Fetch error:", error);
          throw error; // Rethrow the error to handle it outside
        }
      }
      return []; // Return an empty array if userIdOfOpenedChat is 0
    };
  
    useEffect(() => {
      getMessages()
        .then(messages => {
            setMessages((prev: any)=>({
                ...prev,
                [openedChatId]: [
                 ...messages 
                ] }))
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    }, [userIdOfOpenedChat]);
  
    return []; // Return messages state here
  }
  