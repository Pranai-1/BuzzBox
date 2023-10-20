import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { SetStateAction, useEffect, useState } from "react";
import getContacts from "./api/getContacts";
import { ContactType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";
import sendIcon from "../../public/send.png"
import { io } from "socket.io-client";
import axios from "axios";

const ENDPOINT="http://localhost:4000"

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
  const[onlineUsers,setOnlineUsers]=useState([])
  const[messages,setMessages]=useState<string[]>([])

  const [socket, setSocket] = useState<any>(null);


  useEffect(()=>{
    const helper=async()=>{
      if(openedChatId!=0){
  const response=await axios.get("/api/getUserId",{
    headers:{
      openedChatId
    }
  })
  setUserIdOfOpenedChat(response.data.id)
}
}
helper()
  },[openedChatId])

console.log(userIdOfOpenedChat)

  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ["websocket" ]});
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [name]);

useEffect(()=>{
  if(socket==null)return
socket.emit("addNewUser",id)
socket.on("getOnlineUsers",(res: any)=>{
  setOnlineUsers(res)
})
return ()=>{
  socket.off("getOnlineUsers")
}
},[socket])

// useEffect(()=>{
//   if(socket==null)return
//   console.log("Inside useEffect")
//   console.log(messages+"iuhiuh")
// socket.emit("sendMessage",{messages:messages[messages.length-1],userIdOfOpenedChar})
// },[messages])


useEffect(()=>{
  
  if(socket==null)return
socket.on("getMessage",(res: any)=>{
  console.log("inside getmessages")
  console.log(res)  //This is getting called multiple times fix this please
console.log(messages)
  setMessages((prev)=>[...prev,res])

})

  
},[messages])




useEffect(() => {
  setChats(chats);
}, [chats, setChats, openedChatName, openedChatNumberKey,openedChatId]);

function handleClick(clicked: boolean) {
  setOpenChat(clicked);
  alert("clicked");
}

const HandleSend = () => {
  if (textToSend.length !== 0) {
    socket.emit("sendMessage",{messagetosend:textToSend,userIdOfOpenedChat})
    setTextToSend("");
    setMessages((prev)=>[...prev,textToSend])
  }
}

  return (
    <div className=" h-[655px] w-screen bg-slate-50 flex ">
      <div className="h-full w-[350px] flex flex-col bg-slate-100 items-center p-2 pt-0">
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
        />
      ) : (
        <div className="w-full h-full" style={{ maxHeight: '655px', overflowY: 'auto' }}>
         {openChat?(
           <div className="h-full w-full relative">
            <div className="h-[50px] w-full bg-gray-200 rounded flex justify-between">
              <p className="p-2 ml-2 text-blue-500 font-medium">{openedChatName}</p>
              <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedChatNumberKey}</p>
            </div>
            <div className="h-[550px] w-full bg-orange-200">
              {messages.map((message)=>(
                 <p className="text-xl font-bold text-red-600">{message}</p>
              ))}
            </div>
            <div className="h-[50px] w-full bg-gray-200 rounded  absolute bottom-2 flex justify-center items-center">
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
