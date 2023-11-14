import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useRef, useState } from "react";
import getContacts from "./api/helpers/getContacts";
import { ContactType, Messages, OnlineUsers } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";
import sendIcon from "../../public/send.png"
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
//const ENDPOINT="https://buzzbox-socket.onrender.com/"

 const ENDPOINT="http://localhost:4000/"

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
  const [openedChatName, setOpenedChatName] = useState("");
  const [openedChatNumberKey, setOpenedChatNumberKey] = useState(0);
  const [openedChatId, setOpenedChatId] = useState(0);
  const[userIdOfOpenedChat,setUserIdOfOpenedChat]=useState(0)
  const [textToSend, setTextToSend] = useState("");
  const[onlineUsers,setOnlineUsers]=useState<OnlineUsers[]>([])
  const[messages,setMessages]=useState<Messages>([])
const[isOnline,setIsOnline]=useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
 const[emptyChat,setemptyChat]=useState<boolean>(true)

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
  
//This is used to add a new user which is ourselves to the onlineusers of the server and then server sends back all the onlineusers

  useEffect(()=>{
    if (socket) {
      socket.emit("addNewUser", id);
     socket.on("getOnlineUsers", (res: any) => {
        setOnlineUsers(res);
    })
  }
  
  },[socket,id])
  
console.log(onlineUsers)


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

console.log(chats)


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



useEffect(()=>{
  setTimeout(()=>{
    setemptyChat(true)
  },100)
 },[openedChatId])


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
  

function handleClick(clicked: boolean) {
  setOpenChat(clicked);
}

const handleKeyDown = (e:any) => {
  if (e.key === 'Enter') {
    HandleSend();
  }
};

  return (
    <div className="h-full w-full ">
          <Navbar />
          <div className="flex">
  <div className="h-[657px] w-[350px] flex flex-col items-center p-2 pt-0 bg-gradient-to-b from-teal-400 to-purple-600">
    <div>
      <Profile name={name} numberKey={numberKey} />
    </div>
    <div className="flex justify-center gap-5 w-full  mt-3 ">
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl  " onClick={() => {
      setAddNewChat(true);
    }}>
      <p className="text-sm text-black font-medium mt-0">New Chat</p>
    </div>
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl " onClick={() => {
      setAddNewRoom(true);
    }}>
      <p className="text-sm text-black font-medium mt-0">New Room</p>
    </div>
    </div>
   
     <div className="flex flex-col gap-5 flex-wrap w-full mt-5" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {chats.map((contact) => (
        <Contacts
          id={contact.id}
          name={contact.name}
          numberKey={contact.numberKey}
          handleClick={() => handleClick(true)}
          setOpenedChatName={setOpenedChatName}
          setOpenedChatNumberKey={setOpenedChatNumberKey}
          setOpenedChatId={setOpenedChatId}
        />
      ))}
    </div>
   
      {chatRooms.length>0 && (
         <div className="flex flex-col gap-5 flex-wrap w-full mt-10" style={{ maxHeight: '300px', overflowY: 'auto' }}>
           <p className="font-bold text-center text-red-700">Rooms:</p>
           {chatRooms.map((room: any) => (
             <Rooms
               id={room.id}
               roomkey={room.key}
               />
           ))}
           </div>
      )}
     
   
  </div>
  {addNewChat ? (
    <AddChat
      setAddNewChat={setAddNewChat}
      setChats={setChats}
      id={id}
    />
  ) : (
    (addNewRoom?(
     <AddRoom
     setAddNewRoom={setAddNewRoom}
     setChats={setChats}
     id={id}
   />
    ):(
      <div className="w-full h-[657px]">
      {openChat ? (
        <div className="h-full w-full relative">
          <div className="h-[50px] w-full bg-slate-300 flex justify-between rounded-lg">
            <Online status={isOnline} name={openedChatName}/>
            <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedChatNumberKey}</p>
          </div>

          {emptyChat ? (
            <div className="h-[550px] w-full bg-slate-100 flex justify-center items-center">
              <p>Loading Chats ......</p>
            </div>
          ) : (
            <ReactScrollToBottom>
              <div className="h-[500px] w-full flex flex-col  rounded-xl" style={{ maxHeight: '550px' }}>
                {renderMessages()}
              </div>
            </ReactScrollToBottom>
          )}

          <div className="h-[50px] w-full bg-slate-300 rounded absolute bottom-0 flex justify-center items-center">
            <label className="bg-white h-[40px] w-2/3 rounded-lg p-2 flex items-center justify-between font-medium">
              <input
                className="h-[40px] w-full p-2 border-orange-500"
                title="message"
                placeholder="Enter your message here"
                value={textToSend}
                onChange={(e) => { setTextToSend(e.target.value) }}
                onKeyDown={handleKeyDown}
              />
              <div onClick={HandleSend}>
                <img src={sendIcon.src} className="h-[40px] cursor-pointer" alt="Send" />
              </div>
            </label>
          </div>
        </div>
      ) : (
        <WelcomeChat name={name}/>
      )}
    </div>
    ))
   
  )}
  </div>
</div>

  );
}


