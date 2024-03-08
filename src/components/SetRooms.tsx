import { RoomType } from "@/pages/api/types"
import axios from "axios"
import { useEffect, useState } from "react"

type DestructuredObj={
    setChatRooms:any,
id:number
}

export default function SetRooms(obj:DestructuredObj){
    let{setChatRooms,id}=obj
    useEffect(()=>{
        let headers={
          id
      }
        async function helper(){
            try{
        const response=await axios.get("/api/room/getRooms",{headers})
        setChatRooms(response.data.rooms)
            }catch(error){
              setChatRooms([])
            }
        }
        helper()
      },[])
}