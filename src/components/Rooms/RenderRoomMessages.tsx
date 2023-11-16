export default function RenderRoomMessages({roomMessages,openedRoomId,id}:{roomMessages:any,openedRoomId:any,id:number}){
    const currentChatMessages = roomMessages[openedRoomId] || [];
   console.log(currentChatMessages)
    return currentChatMessages.map((message: any, index: number) => {
      const isSentByYou = message.senderId === id;
      const messageClass = isSentByYou ? '' : ''; 
      return (
      (isSentByYou ? (
        <p key={index} className="font-medium text-orange-600 ml-auto mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
      ):(
      <div key={index} className="flex flex-col">
         <p  className=" text-gray-400 ml-2 mr-2  h-max w-max  ">
        sent by:{message.senderId}
      </p>
        <p  className="font-medium text-blue-600 ml-2 mr-2 bg-slate-300 h-max w-max rounded-xl p-2 pt-1 pb-1 mt-1 mb-2">
        {message.text}
      </p>
     
      </div>
      ))          
      );
    });
}