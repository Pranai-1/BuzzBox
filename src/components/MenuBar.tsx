import { signOut } from "next-auth/react"
import { success } from "../../public/toast"
import Title from "./Title"
import Options from "./UserProfile/Options"

export default function MenuBar({setShowContacts,setShowProfile,setAddNewChat,setAddNewRoom,setDisableMenu,setShowChat,showContacts}:
    {setShowContacts:any,setShowProfile:any,setAddNewChat:any,setAddNewRoom:any,setDisableMenu:any,setShowChats:any,showContacts:any}){
    return(
        <>
      <div className={`${showContacts ? 'hidden md:flex flex-col flex-wrap h-full  md:bg-black' : ' h-full w-[150px] bg-black'} `} > 
      <Title/>
     <p className="pt-[1px] bg-white w-full"></p>
    <div className=' h-max w-max p-2 flex font-medium text-xl text-white items-center text-center justify-center gap-2 mt-2 cursor-pointer'  
    onClick={()=>{
        setShowContacts((prev:any)=>!prev)
        // setDisableMenu((prev:any)=>!prev)
      }}>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
    className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
  <span>chats</span>
    </div>
    <div className="h-max w-max p-2 flex font-medium text-xl text-white items-center text-center justify-center gap-2 mt-2 cursor-pointer"
    onClick={()=>{
        setShowProfile((prev:any)=>!prev)
        setDisableMenu((prev:any)=>!prev)
      }}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
<span>profile</span>
</div>
<div className="h-max w-max p-2 flex font-medium text-xl text-white items-center text-center justify-center gap-2 fixed md:bottom-5 bottom-16 cursor-pointer"
 onClick={() => {
    void signOut();
    success("Logged out successfully");
  }}
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

<span>Logout</span>
</div>
<Options setAddNewChat={setAddNewChat} setAddNewRoom={setAddNewRoom} setDisableMenu={setDisableMenu}/>
     </div>
        </>
    )
}