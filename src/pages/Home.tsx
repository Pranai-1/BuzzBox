import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useRef, useState } from "react";
import getContacts from "./api/helpers/getContacts";
import { ContactType, Messages, OnlineUsers } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";

import { Socket, io } from "socket.io-client";
import axios from "axios";
import ReactScrollToBottom from "react-scroll-to-bottom"
import { number } from "zod";
import Online from "@/components/Online";
import WelcomeChat from "@/components/WelcomeChat";
import Navbar from "@/components/navbar";
import AddRoom from "@/components/AddRoom";
import getRooms from "./api/helpers/getRooms";
import Rooms from "@/components/Rooms";
import ContactMessages from "@/components/ContactMessages";
import RoomMessages from "@/components/RoomMessages";
const ENDPOINT="https://buzzbox-socket.onrender.com/"

 //const ENDPOINT="http://localhost:4000/"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const contacts = await getContacts(session.user.numberKey);
  const rooms = await getRooms(session.user.numberKey);
  return {
    props: {
      id:session.user.id,
      name: session.user.name,
      numberKey: session.user.numberKey,
      email: session.user.email,
      contacts: contacts,
      rooms:rooms
    },
  };
};

export default function Home({
  name,
  numberKey,
  email,
  contacts,
  rooms,
  id
}: {
  name: string;
  numberKey: number;
  email: string;
  contacts: ContactType[];
  rooms:any;
  id:number
}) {

  const [addNewChat, setAddNewChat] = useState(false);
  const [addNewRoom, setAddNewRoom] = useState(false);
  const [chats, setChats] = useState(contacts);
  const [chatRooms, setChatRooms] = useState(rooms);
  const [openChat, setOpenChat] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openedChatName, setOpenedChatName] = useState("");
  const [openedRoomId, setOpenedRoomId] = useState(0);
  const [openedRoomKey, setOpenedRoomKey] = useState(0);
  const [openedChatNumberKey, setOpenedChatNumberKey] = useState(0);
  const [openedChatId, setOpenedChatId] = useState(0);
  const[userIdOfOpenedChat,setUserIdOfOpenedChat]=useState(0)
  const [textToSend, setTextToSend] = useState("");
  const[onlineUsers,setOnlineUsers]=useState<OnlineUsers[]>([])
  const[messages,setMessages]=useState<Messages>([])
  const[roomMessages,setRoomMessages]=useState<Messages>([])
const[isOnline,setIsOnline]=useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
 const[emptyChat,setemptyChat]=useState<boolean>(false)
 const[emptyRoom,setemptyRoom]=useState<boolean>(false)
 const[usersOfRoom,setUsersOfRoom]=useState<any>([])
 const[count,setCount]=useState<number>(0)
//This useEffect will setup a socket connection 
  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  

  //This is used to establish a real time communication for messages,if user wants to chat with multiple persons at the same time
  //this useEffect useEffect takes care of this scenario.But,if the user is offline then there will be no communication
  //Below Handlesend method will takes care of sending the messages to the socket server
  useEffect(() => {
    const handleMessage = (res: string) => {
      setMessages((prev: any) => ({
        ...prev,
        [openedChatId]: [...(prev[openedChatId] || []), res],
      }));
    };
  
    if (socket) {
      const userOnline = onlineUsers.find((user) => user.userId === userIdOfOpenedChat);// Check if the user is online and should listen for messages
      if (userOnline) {
        socket.on("getMessage", handleMessage);        // Add the event listener when the component mounts
      }
      return () => {
        if (userOnline) {
          socket.off("getMessage", handleMessage);// Remove the event listener when the component unmounts  
        }
      };
    } 
    
  }, [socket, openedChatId, onlineUsers, userIdOfOpenedChat, setMessages]);
  

  const HandleSend = async () => {
   
    if (textToSend.length !== 0 && userIdOfOpenedChat!=0) {
      const message={
        senderId:id,
        receiverId:userIdOfOpenedChat,
        text:textToSend
      }
      const response=await axios.post("/api/messages",message)
   
      setMessages((prev: any)=>({
        ...prev,
        [openedChatId]: [
          ...(prev[openedChatId] || []),
          message 
        ]
      }));
    if(socket)
      socket.emit("sendMessage",{messagetosend:message,userIdOfOpenedChat})
      setTextToSend("");
    }
 
}
  

useEffect(() => {
  const handleRoomMessage = (res: string) => {
  
    setRoomMessages((prev: any) => ({
      ...prev,
      [openedRoomId]: [...(prev[openedRoomId] || []), res],
    }));
   
  };

  if (socket) {
    // const userOnline = onlineUsers.find((user) => user.userId === userIdOfOpenedChat);// Check if the user is online and should listen for messages
    // if (userOnline) {
      socket.on("getRoomMessage", handleRoomMessage);        // Add the event listener when the component mounts
    //}
    return () => {
      // if (userOnline) {
        socket.off("getRoomMessage", handleRoomMessage);// Remove the event listener when the component unmounts  
     // }
    };
  } 
  
}, [socket, openedRoomId, onlineUsers, setRoomMessages]);


const HandleRoomSend = async () => {
  if (textToSend.length !== 0 && openedRoomId!=0) {
    const message={
      senderId:id,
      //receiverId:usersOfRoom,
      text:textToSend
    }
    //const response=await axios.post("/api/messages",message)
 
    setRoomMessages((prev: any)=>({
      ...prev,
      [openedRoomId]: [
        ...(prev[openedRoomId] || []),
        message 
      ]
    }));
  if(socket)
    socket.emit("sendRoomMessage",{messagetosend:message,usersOfRoom})
    setTextToSend("");
  }

}

//This is used to add a new user which is ourselves to the onlineusers of the server and then server sends back all the onlineusers

  useEffect(()=>{
    if (socket) {
      socket.emit("addNewUser", id);
     socket.on("getOnlineUsers", (res: any) => {
        setOnlineUsers(res);
    })
  }
  
  },[socket,id])
  
// console.log(onlineUsers)


//This is used to receive the messages from the db 
useEffect(() => {
  const getMessages = async () => {
    if (userIdOfOpenedChat !== 0) {
      let header = {
        senderId: id,
        receiverId: userIdOfOpenedChat
      };
      try {
        const response = await axios.get("/api/messages", { headers: header });
        const data = response.data.messages;
        setMessages((prev: any)=>({
          ...prev,
          [openedChatId]: [
           ...data 
          ]    
        }))
        setemptyChat(false)
   
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  }
  getMessages();
}, [userIdOfOpenedChat]);

useEffect(() => {
  setemptyRoom(false)
}, [openedRoomId]);

// console.log(chats)

useEffect(()=>{
  if(openedRoomId!=0){
  
  const getUsersOfRoom=async()=>{
   const response=await axios.get("/api/getUsersOfRoom",{
    headers:{
      roomId:openedRoomId
    }
   })
   setUsersOfRoom(response.data.roomUsers)
  }

  getUsersOfRoom()
}
},[openedRoomId])

//This is used to get theuserId of the openedchat
useEffect(() => {
  const helper = async () => {
    if (openedChatId !== 0) {
      try {
        const response = await axios.get("/api/getUserId", {
          headers: {
            openedChatId,
          },
        });
        setUserIdOfOpenedChat(response.data.id);
      } catch (error) {
        console.error("Error getting user ID:", error);
      }
    }
  };
  helper();
}, [openedChatId]);



// useEffect(()=>{
//   setTimeout(()=>{
//     setemptyChat(true)
//   },10)
//  },[openedChatId])

//  useEffect(()=>{
//   setTimeout(()=>{
//     setemptyRoom(true)
//   },10)
//  },[openedRoomId])


useEffect(() => {
  if (onlineUsers.find(user => user.userId === userIdOfOpenedChat)) {
    setIsOnline(true);
  } else {
    setIsOnline(false);
  }
}, [onlineUsers, userIdOfOpenedChat]);




  const renderMessages = () => {
    const currentChatMessages = messages[openedChatId] || [];
  
    return currentChatMessages.map((message: any, index: number) => {
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? 'text-orange-600 ml-auto mr-2' : 'text-blue-600 ml-2'; 
      return (
      
        <p key={index} className={`font-medium ${messageClass} bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2`}>
          {message.text}
        </p>
        
      );
    });
  };
  
  const renderRoomMessages = () => {
    const currentChatMessages = roomMessages[openedRoomId] || [];
   
    return currentChatMessages.map((message: any, index: number) => {
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? '' : ''; 
      return (
      (isSentByYou ? (
        <p key={index} className="font-medium text-orange-600 ml-auto mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
      ):(
      <div key={index} className="flex flex-col">
         <p  className=" text-gray-400 ml-2 mr-2  h-max w-max  ">
        sent by:{message.senderId}
      </p>
        <p  className="font-medium text-blue-600 ml-2 mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
     
      </div>
      ))
        
        
      );
    });
  };
  

function handleChatClick() {
  setOpenChat(true);
  setOpenRoom(false)
}


  function handleRoomClick() {
    setOpenChat(false);
    setOpenRoom(true)
  }

  return (
    <div className="h-full w-full ">
          <Navbar />
          <div className="flex">
  <div className="h-[657px] w-[370px] flex flex-col items-center p-2 pt-0 bg-gradient-to-b from-teal-400 to-purple-600"
  style={{ maxHeight: '657px', overflowY: 'auto', overflowX: 'hidden' }}>
    <div>
      <Profile name={name} numberKey={numberKey} />
    </div>
    <div className="flex justify-center gap-5 w-full  mt-3 ">
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl  " onClick={() => {
      setAddNewChat(true);
      setAddNewRoom(false);
    }}>
      <p className="text-sm text-black font-medium mt-0">New Chat</p>
    </div>
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl " onClick={() => {
      setAddNewRoom(true);
      setAddNewChat(false)
    }}>
      <p className="text-sm text-black font-medium mt-0">New Room</p>
    </div>
    </div>
   
     <div className="flex flex-col gap-5 flex-wrap w-full mt-5" >
      {chats.map((contact) => (
        <Contacts
          id={contact.id}
          name={contact.name}
          numberKey={contact.numberKey}
          handleClick={() => handleChatClick()}
          setOpenedChatName={setOpenedChatName}
          setOpenedChatNumberKey={setOpenedChatNumberKey}
          setOpenedChatId={setOpenedChatId}
        />
      ))}
    </div>
   
      {chatRooms.length>0 && (
         <div className="flex flex-col gap-5 flex-wrap w-full mt-10" >
           <p className="font-bold text-center text-red-700">Rooms:</p>
           {chatRooms.map((room: any) => (
             <Rooms
               roomid={room.id}
               roomkey={room.key}
               handleClick={() => handleRoomClick()}
               setOpenedRoomKey={setOpenedRoomKey}
              setOpenedRoomId={setOpenedRoomId}
               />
           ))}
           </div>
      )}
     
   
  </div>
  {addNewChat ? (
  <AddChat setAddNewChat={setAddNewChat} setChats={setChats} id={id} />
) : addNewRoom ? (
  <AddRoom setAddNewRoom={setAddNewRoom} setChatRooms={setChatRooms} id={id} />
) : (
  <div className="w-full h-[657px]">
    {openChat ? (
      <ContactMessages
        isOnline={isOnline}
        openedChatName={openedChatName}
        openedChatNumberKey={openedChatNumberKey}
        emptyChat={emptyChat}
        renderMessages={renderMessages}
        textToSend={textToSend}
        setTextToSend={setTextToSend}
        HandleSend={HandleSend}
      />
    ): openRoom?(
      <RoomMessages
      openedRoomId={openedRoomId}
      openedRoomKey={openedRoomKey}
      emptyChat={emptyChat}
      renderRoomMessages={renderRoomMessages}
      textToSend={textToSend}
      setTextToSend={setTextToSend}
      HandleSend={HandleRoomSend}
    />
    ) : (
      <WelcomeChat name={name} />
    )}
  </div>
)}

  </div>
</div>

  );
}


