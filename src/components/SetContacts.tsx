import { ContactType, ContactUserType } from "@/pages/api/types";
import axios from "axios";
import { useEffect, useState } from "react";

type DestructuredObj={
    setChats:any,
id:number
}

export default function SetContacts(obj:DestructuredObj){
    const{setChats,id}=obj
    let headers={
        id
    }
    useEffect(()=>{
        async function helper(){
            try{
                const response=await axios.get("/api/contacts/getcontacts",{headers})
                setChats(response.data.chats)
            }catch(error){
                setChats([])
            }
        }
        helper()
    },[])
}