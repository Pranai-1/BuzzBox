import ReactScrollToBottom from "react-scroll-to-bottom"
import Online from "../UserProfile/Online"
import sendIcon from "../../../public/send.png"
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
        setTextToSend:any,
        HandleSend:any

    }
){
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
          HandleSend("room");
        }
      };
      
    return(
        <div className="h-full w-full relative">
        <div className="h-[50px] w-full bg-slate-300 flex justify-between rounded-lg">
         
          <p className="p-2 ml-2 text-red-500 font-medium">Key-{openedRoomKey}</p>
        </div>

        {emptyRoom ? (
          <div className="h-[550px] w-full bg-slate-100 flex justify-center items-center">
            <p>Loading Chats ......</p>
          </div>
        ) : (
          <ReactScrollToBottom>
            <div className="h-[500px] w-full flex flex-col  rounded-xl" style={{ maxHeight: '550px' }}>
              {renderRoomMessages()}
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
              onChange={(e) =>  setTextToSend(e.target.value) }
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