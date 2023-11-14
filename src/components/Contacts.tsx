import { Dispatch, SetStateAction } from "react";


export default function Handler({
  id,
  name,
  numberKey,
  handleClick,
  setOpenedChatName,
  setOpenedChatNumberKey,
  setOpenedChatId
}: {
  id: number;
  name: string;
  numberKey: number;
  handleClick:any
  setOpenedChatName:Dispatch<SetStateAction<string>>;
  setOpenedChatNumberKey:Dispatch<SetStateAction<number>>;
  setOpenedChatId:Dispatch<SetStateAction<number>>
}) {
  const char=name.charAt(0).toLocaleUpperCase()
  return (
    <div className="h-[50px] bg-slate-200 w-full cursor-pointer rounded-lg flex items-center p-2" onClick={()=>{
      handleClick()
      setOpenedChatName(name)
      setOpenedChatNumberKey(numberKey)
      setOpenedChatId(id)
    }}>
      <div className="w-10 h-10 bg-gray-400 rounded-full mr-2 flex justify-center items-center">
        <p className="font-medium text-xl">{char}</p>
      </div>
      <p className="p-2 font-medium">{name}</p>
    </div>
  );
}
