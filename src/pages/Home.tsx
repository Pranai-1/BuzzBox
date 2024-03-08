import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import {  useCallback, useEffect, useMemo, useState } from "react";
import { ContactType, ContactMessageType, OnlineUsers, RoomType, RoomMessage, RoomMessageType, ContactMessage, ContactUserType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/UserProfile/AddChat";
import Profile from "../components/UserProfile/profile";
import { Socket, io } from "socket.io-client";
import WelcomeChat from "@/components/Base/WelcomeChat";
import AddRoom from "@/components/Rooms/AddRoom";
import Rooms from "@/components/Rooms/Rooms";
import ContactMessages from "@/Contacts/ContactMessages";
import RoomMessages from "@/components/Rooms/RoomMessages";
import RenderRoomMessages from "@/components/Rooms/RenderRoomMessages";
import RenderContactMessages from "@/Contacts/RenderContactMessages";
import { Message } from "postcss";
import MenuBar from "@/components/MenuBar";
import styles from "../pages/[Home].module.css"
import useGetUserId from "@/components/useGetUserId";
import useIsOnline from "@/components/useIsOnline";
import HandleRoomSend from "@/components/HandleRoomSend";
import { HandleSend } from "@/components/HandleSend";
import axios from "axios";
import SetDBMessages from "@/components/SetDBMessages";
import SetRooms from "@/components/SetRooms";
import SetContacts from "@/components/SetContacts";
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
  //const contacts = await getContacts(session.user.numberKey); //session also contains contacts,but that contacts doesn't have detail 
  //information,it has a contactId and userId like this [ { contactId: 70, userId: 25 } ],but we want [ { id: 70, userId: 25, name: 'pranai', numberKey: 123456 } ] 
  //like that.
  //instead of sending session.user.numberKey ,we can send session.user.id as well but we need to change the function of getContacts
  //we can even send session.user.contacts and get the data

  return {
    props: {
      id:session.user.id,
      name: session.user.name,
      numberKey: session.user.numberKey,
      email: session.user.email,
    },
  };
};

export default function Home({
  name,
  numberKey,
  id
}: {
  name: string;
  numberKey: number;
  id:number
}) {

  const [addNewChat, setAddNewChat] = useState(false);
  const [addNewRoom, setAddNewRoom] = useState(false);
  const [chats, setChats] = useState<ContactType[]>([]);
  const [chatRooms, setChatRooms] = useState<RoomType[]>([]);
  const [openChat, setOpenChat] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openedChatName, setOpenedChatName] = useState("");
  const [openedRoomId, setOpenedRoomId] = useState(0);
  const [openedRoomKey, setOpenedRoomKey] = useState(0);
  const [openedChatNumberKey, setOpenedChatNumberKey] = useState(0);
  const [openedChatId, setOpenedChatId] = useState(0);
  const [textToSend, setTextToSend] = useState("");
  const[onlineUsers,setOnlineUsers]=useState<OnlineUsers[]>([])
  const[messages,setMessages]=useState<ContactMessageType>({})
  const[roomMessages,setRoomMessages]=useState<RoomMessageType>({})
  const [socket, setSocket] = useState<Socket | null>(null);
 const[emptyChat,setemptyChat]=useState<boolean>(false)
 const[emptyRoom,setemptyRoom]=useState<boolean>(false)
 const[showContacts,setShowContacts]=useState<boolean>(false)
 const[showProfile,setShowProfile]=useState<boolean>(false)
 const[disableMenu,setDisableMenu]=useState<boolean>(false)



//This is used to get theuserId of the openedchat
let userIdOfOpenedChat=useGetUserId(openedChatId)

let objIsOnline=useMemo(()=>{return{userIdOfOpenedChat,onlineUsers}},[userIdOfOpenedChat,onlineUsers])
let isOnline=useIsOnline(objIsOnline)

//This is used to receive the messages from the db 
let objGetDBMsgs=useMemo(()=>{
  return{
  userIdOfOpenedChat,
  id,
  openedChatId,
  setMessages
  }

},[userIdOfOpenedChat,id,openedChatId,setMessages])
SetDBMessages(objGetDBMsgs)

useEffect(()=>{
  let headers={
    id
}
  async function helper(){
      try{
  const response=await axios.get("/api/rooms",{headers})
  setChatRooms(response.data.rooms)
      }catch(error){
        setChatRooms([])
      }
  }
  helper()
},[])

useEffect(()=>{
  let headers={
    id
}
  async function helper(){
      try{
          const response=await axios.get("/api/contacts",{headers})
          setChats(response.data.chats)
      }catch(error){
          setChats([])
      }
  }
  helper()
},[])




//This useEffect will setup a socket connection 
  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  

//This is used to add a new user which is ourselves to the onlineusers of the server and then server sends back all the onlineusers
useEffect(()=>{
  if (socket) {
    socket.emit("addNewUser", id);
   socket.on("getOnlineUsers", (res: OnlineUsers[]) => {
      setOnlineUsers(res);
  })
}
},[socket,id])

// console.log(onlineUsers)


  //This is used to establish a real time communication for messages,if user wants to chat with multiple persons at the same time
  //this useEffect  takes care of this scenario.But,if the user is offline then there will be no communication,here we are receieving
  //the messages from the server whenever i click on different users
  //Below Handlesend method will takes care of sending the messages to the socket server
  useEffect(() => {
    const handleMessage = (res: Message) => {
      setMessages((prev:any) => ({
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
    
  }, [openedChatId, onlineUsers]);


  
  let objSend=useMemo(()=>{
    return{
      textToSend,userIdOfOpenedChat,id,setMessages,openedChatId,socket,setTextToSend
    }}
  ,[openedRoomId,textToSend,id])


  //Here i am sending the message to the server
const helperSend=useCallback(async ()=>{
  HandleSend(objSend)
},[objSend])
  


let objRoomSend=useMemo(()=>{
  return{
    socket,setTextToSend,openedRoomId,setRoomMessages,textToSend,id
  }}
,[openedRoomId,textToSend,id])

const helperRoom=useCallback(async()=>{ 
  HandleRoomSend(objRoomSend)
},[objRoomSend])

useEffect(() => {
  const handleRoomMessage = (res: RoomMessage) => {
    setRoomMessages((prev:any) => ({
      ...prev,
      [res.roomId]: [...(prev[res.roomId] || []), res],
     
    }));
  };
  if (socket) {
      socket.on("getRoomMessage", handleRoomMessage);        
    return () => {  
        socket.off("getRoomMessage", handleRoomMessage);
    };
  }   
}, [socket, openedRoomId, onlineUsers, setRoomMessages]);



useEffect(()=>{
  if(openedRoomId!=0){
  if(socket){
    let data={
      id,
     roomId: openedRoomId
    }
    socket.emit("AddUserToRoom",data)
  }
}
},[openedRoomId])





  const renderContactMessages = () => {
   return <RenderContactMessages messages={messages} openedChatId={openedChatId} id={id}/>
  };
  
  const renderRoomMessages = () => {
    return(
      <RenderRoomMessages roomMessages={roomMessages} openedRoomId={openedRoomId} id={id}/>
    )
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
    <div className={`flex min-h-screen bg-gray-900 relative `} >
        <div className="md:hidden text-white text-xl font-bold fixed z-10 bottom-5 ring-2 ring-gray-400 rounded-lg p-2 flex left-1 cursor-pointer bg-red-400"
            onClick={()=>{
              if(showContacts){
                setShowContacts(false)
                setDisableMenu(false)
                setOpenChat(false)
              }else{
                setShowContacts(true)
               
                // setDisableMenu(true)
              }
          
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

    </div>
    <div className={`${disableMenu ? "hidden md:flex w-[140px] md:w-[29%] border-r border-gray-700 relative overflow-auto " 
    : `md:w-[29%] w-[150px] border-r border-gray-700 relative md:flex h-[100vh] overflow-auto ${styles.scrollbarhide} pr-36 md:pr-0
    ${openChat ?'hidden md:block':''}`}`}>

            <MenuBar
                setShowContacts={setShowContacts}
                setShowProfile={setShowProfile}
                setAddNewChat={setAddNewChat}
                setAddNewRoom={setAddNewRoom}
                setDisableMenu={setDisableMenu}
                showContacts={showContacts}
            />
            <div className={` ${openChat ?'hidden md:block':''} w-[150px]  overflow-auto ${styles.scrollbarhide}`}>
            {showContacts && (
                <div className="grid gap-5 flex-wrap mt-14 m-2 w-full max-h-[85vh] " >
                    {chats.map((contact) => (
                        <Contacts
                            key={contact.id} 
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
                
            )}
            {showContacts &&chatRooms.length>0 && (
         <div className="flex flex-col gap-5 flex-wrap w-full mt-10" >
           <p className="font-bold text-center text-red-700">Rooms:</p>
           {chatRooms.map((room) => (
             <Rooms
             key={room.id}
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
    </div>
  
     {showProfile ?(
          <>
              <Profile name={name} numberKey={numberKey} setShowProfile={setShowProfile} setDisableMenu={setDisableMenu}/>
              </>
            ) :addNewChat ? (
              <AddChat setAddNewChat={setAddNewChat} setChats={setChats} id={id} setDisableMenu={setDisableMenu}/>
            ) : addNewRoom ? (
              <AddRoom setAddNewRoom={setAddNewRoom} setChatRooms={setChatRooms} id={id} setDisableMenu={setDisableMenu}/>
              ) :openChat ? (
                    <ContactMessages
                      isOnline={isOnline}
                      openedChatName={openedChatName}
                      openedChatNumberKey={openedChatNumberKey}
                      emptyChat={emptyChat}
                      renderContactMessages={renderContactMessages}
                      textToSend={textToSend}
                      setTextToSend={setTextToSend}
                      HandleSend={helperSend}
                    />
                  ): openRoom ? (
                    <RoomMessages
                    openedRoomId={openedRoomId}
                    openedRoomKey={openedRoomKey}
                    emptyRoom={emptyRoom}
                    renderRoomMessages={renderRoomMessages}
                    textToSend={textToSend}
                    setTextToSend={setTextToSend}
                    HandleSend={helperRoom}
                  />
            ) :(
              <>
              <WelcomeChat name={name} />
        </>
     )}
  </div>

  );
}
