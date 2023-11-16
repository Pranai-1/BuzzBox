export interface signupBody {
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
  [key: number]: ContactMessage[]; 
}
