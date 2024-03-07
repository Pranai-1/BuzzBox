import { OnlineUsers } from "@/pages/api/types";

export default function useIsOnline(obj:any){
  const{onlineUsers,userIdOfOpenedChat}=obj
  if (onlineUsers.find((user:OnlineUsers) => user.userId === userIdOfOpenedChat)) {
    return true;
  } else {
    return false;
  }
}