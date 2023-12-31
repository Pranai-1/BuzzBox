import ReactScrollToBottom from "react-scroll-to-bottom"
import Online from "../components/UserProfile/Online"
import sendIcon from "../../public/send.png"
import { Dispatch, SetStateAction } from "react";
export default function Handler(
    {
        isOnline,
        openedChatName,
        openedChatNumberKey,
        emptyChat,
        renderContactMessages,
        textToSend,
        setTextToSend,
        HandleSend

    }:{
        isOnline:boolean,
        openedChatName:string,
        openedChatNumberKey:number,
        emptyChat:boolean,
        renderContactMessages:any,
        textToSend:string,
        setTextToSend:Dispatch<SetStateAction<string>>,
        HandleSend:()=>Promise<void>

    }
){
    const handleKeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
          HandleSend();
        }
      };
      
    return(
        <div className="h-full w-full relative ">
        <div className="h-[50px] w-full bg-slate-300 flex justify-between rounded-lg mt-1">
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
              {renderContactMessages()}
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
              onChange={(e) =>setTextToSend(e.target.value) }
              onKeyDown={handleKeyDown}
            />
            <div onClick={HandleSend}>
              <img src={sendIcon.src} className="h-[40px] cursor-pointer" alt="Send" />
            </div>
          </label>
        </div>
      </div>
    )
}