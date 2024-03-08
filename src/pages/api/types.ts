import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface SignupBody {
  name: string;
  email: string;
  password: string;
  numberKey: number;
}

export interface loginBody {
  email: string;
  password: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  contacts: ContactUserType[];
  numberKey: number;
};

export type ContactType = {
  id: number;
  name: string;
  userId:number
  numberKey: number;
};

export type RoomType = {
  id: number;
 key: number;
};

export type ContactUserType = {
  contactId: number;
  userId: number;
};

// export type MessageType = {
//   id: number;
//   content: string;
//   senderId: number;
// };

export type addContact = {
  name: string;
  numberKey: number;
};

export type CustomToken = {
  id: number;
  name: string;
  password: string;
  email: string;
  messages: ContactType[];
};

export type OnlineUsers={
  userId:number,
  socketId:string
}
export type ContactMessage={
  senderId:number,
  receiverId:number,
  text:string
}
export type ContactMessageType = {
  [key: number]: ContactMessage[]; 
}
export type RoomMessage={
  senderId:number,
  roomId:number,
  text:string
}
export type RoomMessageType = {
  [key: number]: RoomMessage[]; 
}


export type pricebox={

    name:string,
    text:string,
    storage :number,
    size:number,
    support:number,
    price:number

}

export interface RoomSend {
  setRoomMessages: Dispatch<SetStateAction<RoomMessageType>>;
  socket: Socket | null;
    setTextToSend: Dispatch<SetStateAction<string>>;
    openedRoomId: number;
    textToSend: string;
    id: number;
}

export interface Send {
  textToSend: string;
  userIdOfOpenedChat: number; 
  id: number; 
  setMessages: Dispatch<SetStateAction<ContactMessageType>>; 
  openedChatId: number; 
  socket: Socket | null; 
  setTextToSend: Dispatch<SetStateAction<string>>;
}


export type MenuControl = {
  setShowContacts:Dispatch<SetStateAction<boolean>>;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  setAddNewChat: Dispatch<SetStateAction<boolean>>;
  setAddNewRoom: Dispatch<SetStateAction<boolean>>;
  setDisableMenu:Dispatch<SetStateAction<boolean>>;
  showContacts: boolean;
};
