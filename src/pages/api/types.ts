import { Contact,Message } from "@prisma/client";

export interface signupBody{
    name :string,
    email:string,
    password:string,
     numberKey:string
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
    contacts:Contact[] 
    
  };

  export type CustomToken = {
    id: number;
    name: string;
    password: string;
    email: string;
    contacts: Message[];
    messages: Contact[] ; 
  };