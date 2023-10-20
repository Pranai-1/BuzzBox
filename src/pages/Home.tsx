import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import getContacts from "./api/getContacts";
import { ContactType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";
import sendIcon from "../../public/send.png"
import { io } from "socket.io-client";
import axios from "axios";

// const ENDPOINT="https://buzzbox-socket.onrender.com/"

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
  const[onlineUsers,setOnlineUsers]=useState<[]>([])
  const[messages,setMessages]=useState<any>([])

  const [socket, setSocket] = useState<any>(null);

  
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

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", id);
     console.log(socket.id)
      socket.on("getOnlineUsers", (res: any) => {
        setOnlineUsers(res);
      });

      socket.on("getMessage", (res: string) => {
        console.log(res)
        setMessages((prev: any)=>({
          ...prev,
          [openedChatId]: [
            ...(prev[openedChatId] || []),
            res 
          ]
          
        }));
   
      });

      return () => {
        socket.off("getOnlineUsers");
        socket.off("getMessage");
      };
    }
  }, [socket,openedChatId]);

  console.log(messages)

  const renderMessages = () => {
    const currentChatMessages = messages[openedChatId] || [];
    
    return currentChatMessages.map((message: any, index: number) => {
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? 'text-orange-600 ml-auto mr-2' : 'text-blue-600 ml-2'; 
      return (
        <p key={index} className={`font-medium ${messageClass} bg-slate-200 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2`}>
          {message.text}
        </p>
      );
    });
  };
  

useEffect(() => {
  setChats(chats);
}, [chats, openedChatName, openedChatNumberKey,openedChatId]);

function handleClick(clicked: boolean) {
  setOpenChat(clicked);
  alert("clicked");
}

const HandleSend = () => {
  if (textToSend.length !== 0 && userIdOfOpenedChat!=0) {
    const message={
      senderId:id,
      receiverId:userIdOfOpenedChat,
      text:textToSend
    }
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

  return (
    <div className=" h-full w-screen bg-slate-50 flex ">
      <div className="h-[655px] w-[350px] flex flex-col bg-slate-100 items-center p-2 pt-0">
        <div>
          <Profile name={name} numberKey={numberKey} />
        </div>
        <div className="p-2 ml-[250px]">
          <p
            className=" text-2xl text-orange-500 ml-6 cursor-pointer mb-0"
            onClick={() => {
              setAddNewChat(true);
            }}
          >
            +
          </p>
          <p className=" text-sm text-orange-500 mt-0">New Chat</p>
        </div>
        <div className="flex flex-col gap-3 flex-wrap  w-full mt-5" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
        <div className="w-full h-[650px]" >
         {openChat?(
           <div className="h-full w-full relative">
            <div className="h-[50px] w-full bg-gray-200 rounded flex justify-between">
              <p className="p-2 ml-2 text-blue-500 font-medium">{openedChatName}</p>
              <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedChatNumberKey}</p>
            </div>
            <div className="h-[550px] w-full flex flex-col " style={{ maxHeight: '550px', overflowY: 'auto' }}>
          
              {renderMessages()}
        
             
            </div>
            <div className="h-[50px] w-full bg-gray-200 rounded  absolute bottom-0 flex justify-center items-center ">
              <label className="bg-white h-[40px] w-2/3 rounded-lg p-2 flex items-center justify-between">
                <input className="h-[40px] w-full p-2 border-orange-500"
                 title="message"
                 placeholder="Enter your message here"
                 value={textToSend}
                 onChange={(e)=>{setTextToSend(e.target.value)}}
                 />
                 <div onClick={HandleSend}>
                 <img src={sendIcon.src} className="h-[40px] cursor-pointer" />
                 </div>
                </label>

              </div>
           </div>
         ):(
          <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-orange-500">Welcome {name}</p>
          <p className="text-xl text-gray-700">Click on contacts to begin chatting.</p>
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
