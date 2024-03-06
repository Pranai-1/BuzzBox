import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import {  useEffect, useState } from "react";
import getContacts from "./api/helpers/getContacts";
import { ContactType, ContactMessageType, OnlineUsers, RoomType, RoomMessage, RoomMessageType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/UserProfile/AddChat";
import Profile from "../components/UserProfile/profile";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import WelcomeChat from "@/components/Base/WelcomeChat";
import AddRoom from "@/components/Rooms/AddRoom";
import getRooms from "./api/helpers/getRooms";
import Rooms from "@/components/Rooms/Rooms";
import ContactMessages from "@/Contacts/ContactMessages";
import RoomMessages from "@/components/Rooms/RoomMessages";
import Options from "@/components/UserProfile/Options";
import RenderRoomMessages from "@/components/Rooms/RenderRoomMessages";
import RenderContactMessages from "@/Contacts/RenderContactMessages";
import { Message } from "postcss";
import Title from "@/components/Title";
import MenuBar from "@/components/MenuBar";
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
  const contacts = await getContacts(session.user.numberKey); //session also contains contacts,but that contacts doesn't have detail 
  //information,it has a contactId and userId like this [ { contactId: 70, userId: 25 } ],but we want [ { id: 70, userId: 25, name: 'pranai', numberKey: 123456 } ] 
  //like that.
  //instead of sending session.user.numberKey ,we can send session.user.id as well but we need to change the function of getContacts
  //we can even send session.user.contacts and get the data

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
  contacts,
  rooms,
  id
}: {
  name: string;
  numberKey: number;
  contacts: ContactType[];
  rooms:RoomType[];
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
  const[messages,setMessages]=useState<ContactMessageType>({})
  const[roomMessages,setRoomMessages]=useState<RoomMessageType>({})
const[isOnline,setIsOnline]=useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
 const[emptyChat,setemptyChat]=useState<boolean>(false)
 const[emptyRoom,setemptyRoom]=useState<boolean>(false)
 const[showContacts,setShowContacts]=useState<boolean>(false)
 const[showProfile,setShowProfile]=useState<boolean>(false)
 const[disableMenu,setDisableMenu]=useState<boolean>(false)
 const[showChats,setShowChats]=useState<boolean>(false)

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
    const handleMessage = (res: Message) => {
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
  const handleRoomMessage = (res: RoomMessage) => {
    setRoomMessages((prev: any) => ({
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
console.log(messages)

const HandleRoomSend = async () => {
  if (textToSend.length !== 0 && openedRoomId!=0) {
    const message={
      senderId:id,
      roomId:openedRoomId,
      text:textToSend
    }
    setRoomMessages((prev: any)=>({
      ...prev,
      [openedRoomId]: [
        ...(prev[openedRoomId] || []),
        message 
      ]
    }));
  if(socket)
    socket.emit("sendRoomMessage",{messagetosend:message,roomId:openedRoomId})
    setTextToSend("");
  }

}

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

// useEffect(() => {
//   setemptyRoom(false)
// }, [openedRoomId]);


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

//This is used to get theuserId of the openedchat
useEffect(() => {
  const helper = async () => {
    if (openedChatId !== 0) {
      try {
        console.log(openedChatId)
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
 useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .scrollbar-hide::-webkit-scrollbar {
          display: none;
      }
      
      .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);
    
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-900 relative ">
        <div className="md:hidden text-white text-xl font-bold fixed z-10 bottom-5 ring-2 ring-gray-400 rounded-lg p-2 flex left-10 cursor-pointer bg-red-400"
            onClick={()=>{
              if(showContacts){
                setShowContacts(false)
                setDisableMenu(false)
              }else{
                setShowContacts(true)
                // setDisableMenu(true)
              }
          
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

    </div>
    <div className={`${disableMenu ? "hidden md:flex w-[140px] md:w-[29%] border-r border-gray-700 relative overflow-auto " 
    : "md:w-[29%] w-[150px] border-r border-gray-700 relative md:flex h-[100vh] overflow-auto scrollbar-hide pr-36 md:pr-0"}`}>

            <MenuBar
                setShowContacts={setShowContacts}
                setShowProfile={setShowProfile}
                setAddNewChat={setAddNewChat}
                setAddNewRoom={setAddNewRoom}
                setDisableMenu={setDisableMenu}
                setShowChats={setShowChats}
                showContacts={showContacts}
            />
            <div className="w-[150px]  overflow-auto scrollbar-hide">
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
                      HandleSend={HandleSend}
                    />
                  ): openRoom ? (
                    <RoomMessages
                    openedRoomId={openedRoomId}
                    openedRoomKey={openedRoomKey}
                    emptyRoom={emptyRoom}
                    renderRoomMessages={renderRoomMessages}
                    textToSend={textToSend}
                    setTextToSend={setTextToSend}
                    HandleSend={HandleRoomSend}
                  />
            ) :(
              <>
              <WelcomeChat name={name} />
        </>
     )}
  </div>

  );
}
{/* <div className="flex fixed bottom-5 h-10 aspect-square lg:hidden justify-center items-center bg-gray-400 left-5 
       rounded-lg text-gray-200 font-bold text-2xl">
         &#8801;
     </div> */}

{/* <div className="h-full w-screen ">
          <div className="flex">
        <div className="h-[645px] w-[400px] flex flex-col items-center p-2 pt-0 bg-gradient-to-b from-teal-400 to-purple-600
         overflow-y-auto overflow-x-hidden ">
    <div>
      <Profile name={name} numberKey={numberKey} />
    </div>
    <div className="flex justify-center gap-5 w-full  mt-3 ">
      <Options setAddNewChat={setAddNewChat} setAddNewRoom={setAddNewRoom}/>
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
           {chatRooms.map((room) => (
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
  <div className="w-full h-[641px]">
    {openChat ? (
      <ContactMessages
        isOnline={isOnline}
        openedChatName={openedChatName}
        openedChatNumberKey={openedChatNumberKey}
        emptyChat={emptyChat}
        renderContactMessages={renderContactMessages}
        textToSend={textToSend}
        setTextToSend={setTextToSend}
        HandleSend={HandleSend}
      />
    ): openRoom?(
      <RoomMessages
      openedRoomId={openedRoomId}
      openedRoomKey={openedRoomKey}
      emptyRoom={emptyRoom}
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
</div> */}