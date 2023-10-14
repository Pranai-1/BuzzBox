import { Contact,Message } from "@prisma/client";

export interface signupBody{
    name :string,
    email:string,
    password:string,
     numberKey:number
}

export interface loginBody{
    email:string,
    password:string
}

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    messages: Message[];
    contacts:Contact[] ;
    numberKey:number;
    
  };

  export type CustomToken = {
    id: number;
    name: string;
    password: string;
    email: string;
    contacts: Message[];
    messages: Contact[] ; 
  };

 export type ContactType = {
    id: number;
    name: string;
    numberKey: number;
    userId: number;
  };
  
 export type MessageType = {
    id: number;
    content: string;
    senderId: number;
  };

  export type addContact = {
    name: string;
    numberKey: number;
  };