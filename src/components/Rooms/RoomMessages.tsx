import ReactScrollToBottom from "react-scroll-to-bottom"
import Online from "../UserProfile/Online"
import sendIcon from "../../../public/send.png"
import { Dispatch, SetStateAction } from "react";
export default function Handler(
    {
      
        openedRoomKey,
        openedRoomId,
        emptyRoom,
        renderRoomMessages,
        textToSend,
        setTextToSend,
        HandleSend

    }:{
       
        openedRoomKey:number,
        openedRoomId:number,
        emptyRoom:boolean,
        renderRoomMessages:any,
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
        <div className="h-screen w-full relative">
        <div className="h-[50px] w-full ring-2 flex justify-between rounded-lg mt-1">
         
          <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedRoomKey}</p>
        </div>

        {emptyRoom ? (
        <div className="h-[90vh] w-full bg-slate-100 flex justify-center items-center">
        <p>Loading Chats ......</p>
      </div>
        ) : (
          <ReactScrollToBottom>
            <div className={`h-[90vh] w-full flex flex-col  rounded-xl`} style={{ maxHeight: '550px' }}>
              {renderRoomMessages()}
            </div>
          </ReactScrollToBottom>
        )}

<div className="h-[50px] w-full  rounded absolute bottom-4  flex justify-center items-center p-2 border-t-4 border-gray-200">
          <label className="bg-white h-[40px] w-2/3 rounded-lg  flex items-center justify-between font-medium  cursor-pointer">
          <input
            className="h-[40px] w-full ring-2 p-2 ring-red-600 rounded-lg"
            title="message"
            placeholder="Enter your message"
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