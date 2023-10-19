import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/authoptions";
import { useEffect, useState } from "react";
import getContacts from "./api/getContacts";
import { ContactType } from "./api/types";
import Contacts from "@/components/Contacts";
import AddChat from "@/components/AddChat";
import Profile from "../components/profile";
import sendIcon from "../../public/send.png"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  console.log(session?.user.numberKey);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const data = await getContacts(session.user.numberKey);
console.log(data)
  return {
    props: {
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
}: {
  name: string;
  numberKey: number;
  email: string;
  contacts: ContactType[];
}) {

  const [addNewChat, setAddNewChat] = useState(false);
  const [chats, setChats] = useState(contacts);
  const [openChat, setOpenChat] = useState(false);
  const [openedChatName, setOpenedChatName] = useState("");
  const [openedChatNumberKey, setOpenedChatNumberKey] = useState(0);
  const [textToSend, setTextToSend] = useState("");

useEffect(()=>{
setChats(chats)
},[chats,setChats,openedChatName,openedChatNumberKey])

function handleClick(clicked: boolean){
  console.log(clicked)
  setOpenChat(clicked)
  alert("connected")
}

function HandleSend(){
  if(textToSend.length!=0){
    console.log(textToSend)
  }
  setTextToSend('');
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
