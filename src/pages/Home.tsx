import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useRef, useState } from "react";
import getContacts from "./api/helpers/getContacts";
import { ContactType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";
import sendIcon from "../../public/send.png"
import { io } from "socket.io-client";
import axios from "axios";
import ReactScrollToBottom from "react-scroll-to-bottom"
import { number } from "zod";
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
  const data = await getContacts(session.user.numberKey);
  return {
    props: {
      id:session.user.id,
      name: session.user.name,
      numberKey: session.user.numberKey,
      email: session.user.email,
      contacts: data,
    },
  };
};

export default function Home({
  name,
  numberKey,
  email,
  contacts,
  id
}: {
  name: string;
  numberKey: number;
  email: string;
  contacts: ContactType[];
  id:number
}) {

  const [addNewChat, setAddNewChat] = useState(false);
  const [chats, setChats] = useState(contacts);
  const [openChat, setOpenChat] = useState(false);
  const [openedChatName, setOpenedChatName] = useState("");
  const [openedChatNumberKey, setOpenedChatNumberKey] = useState(0);
  const [openedChatId, setOpenedChatId] = useState(0);
  const[userIdOfOpenedChat,setUserIdOfOpenedChat]=useState(0)
  const [textToSend, setTextToSend] = useState("");
  const[onlineUsers,setOnlineUsers]=useState<any[]>([])
  const[messages,setMessages]=useState<any>([])
const[isOnline,setIsOnline]=useState<boolean>();
  const [socket, setSocket] = useState<any>(null);
 const[emptyChat,setemptyChat]=useState<boolean>(true)
  
 useEffect(()=>{
  setTimeout(()=>{
    setemptyChat(true)
  },100)
 },[openedChatId])

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
  
  console.log(messages)
  
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

  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);
 newSocket.on("getOnlineUsers",(res: any) => {
        setOnlineUsers(res);
 })
    return () => {
    
      newSocket.disconnect();
      newSocket.on("getOnlineUsers",(res: any) => {
        setOnlineUsers(res);
       } )
      
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", id);
      socket.on("getOnlineUsers", (res: any) => {
        setOnlineUsers(res);

      });
       
      socket.on("getMessage", (res: string) => {
        setMessages((prev: any)=>({
          ...prev,
          [openedChatId]: [
            ...(prev[openedChatId] || []),
            res 
          ]
          
        }));
   
      });

      return () => {
        socket.off("getOnlineUsers");//turnoff the socket after receiving the messages inorder to avoid unnecessary callings
        socket.off("getMessage");
      };
    }
  }, [socket,openedChatId]);


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
  


useEffect(() => {
  setChats(chats);
}, [chats]);

function handleClick(clicked: boolean) {
  setOpenChat(clicked);
}

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
  
    socket.emit("sendMessage",{messagetosend:message,userIdOfOpenedChat})
    setTextToSend("");
  }
}

useEffect(() => {
  if (onlineUsers.find(user => user.userId === userIdOfOpenedChat)) {
    setIsOnline(true);
  } else {
    setIsOnline(false);
  }
}, [onlineUsers, userIdOfOpenedChat]);

const handleKeyDown = (e:any) => {
  if (e.key === 'Enter') {
    HandleSend();
  }
};
  return (
    <div className="h-full w-full flex">
  <div className="h-[657px] w-[350px] flex flex-col items-center p-2 pt-0 bg-gray-900">
    <div>
      <Profile name={name} numberKey={numberKey} />
    </div>
    <div className="p-2 bg-orange-600 cursor-pointer rounded-xl mt-3 ml-[200px] " onClick={() => {
      setAddNewChat(true);
    }}>
      <p className="text-sm text-black font-medium mt-0">New Chat</p>
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
  </div>
  {addNewChat ? (
    <AddChat
      numberKey={numberKey}
      setAddNewChat={setAddNewChat}
      setChats={setChats}
      id={id}
    />
  ) : (
    <div className="w-full h-[647px] m-1 bg-slate-50">
      {openChat ? (
        <div className="h-full w-full relative">
          <div className="h-[50px] w-full bg-slate-300 flex justify-between rounded-lg">
            {isOnline ? (
              <div>
                <p className="pt-2 ml-2 text-blue-800 font-medium">{openedChatName}</p>
                <div className="flex items-center ml-2 pb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <p className="text-green-500 text-xs">online</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="pt-2 ml-2 text-blue-800 font-medium text-xl">{openedChatName}</p>
              </div>
            )}
            <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedChatNumberKey}</p>
          </div>

          {emptyChat ? (
            <div className="h-[550px] w-full bg-slate-100 flex justify-center items-center">
              <p>Loading Chats ......</p>
            </div>
          ) : (
            <ReactScrollToBottom>
              <div className="h-[550px] w-full flex flex-col bg-slate-100 rounded-xl" style={{ maxHeight: '550px' }}>
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
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-orange-500">Welcome {name}</p>
          <p className="text-xl text-gray-700">Click on contacts to start a chat.</p>
        </div>
      )}
    </div>
  )}
</div>

  );
}



// useEffect(()=>{
//   if(socket==null)return
//   console.log("Inside useEffect")
//   console.log(messages+"iuhiuh")
// socket.emit("sendMessage",{messages:messages[messages.length-1],userIdOfOpenedChar})
// },[messages])



//   async function disconnectusers(socketId: string){
//     try{
//       const response=await axios.put("/api/onlineUsers",{
//         socketId,
//         id
//       })
//       setOnlineUsers(response.data.onlineUsers)
//     }catch(error){
//       console.log(error)
//     }
    
//   }

// async function usersonline(socketId: any){
//   try{
//   const response=await axios.post("/api/onlineUsers",{
//     socketId,
//     id
//   })
//   setOnlineUsers(response.data.onlineUsers)
// }catch(error){
//   console.log(error)
// }

// }