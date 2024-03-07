import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetUserId(openedChatId:number){
    const[userId,setUserId]=useState<number>(0);


     async function getUserId(){
        if (openedChatId !== 0) {
            try {
              console.log(openedChatId)
              const response = await axios.get("/api/getUserId", {
                headers: {
                  openedChatId,
                },
              });
              return response.data.id;
            } catch (error) {
              console.error("Error getting user ID:", error);
            }
          }
          return -1;
     }
     
    useEffect(()=>{
        async function helper(){
            setUserId(await getUserId())
        }
        helper()
    },[openedChatId])
    return userId;
}