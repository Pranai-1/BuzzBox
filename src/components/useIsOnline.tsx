import { OnlineUsers, User } from "@/pages/api/types";

type DestructuredObj = {
  onlineUsers:OnlineUsers[];
  openedChatId: number;
};

export default function useIsOnline(props:DestructuredObj){
  const{onlineUsers,openedChatId}=props
  if (onlineUsers.find((user:OnlineUsers) => user.userId === openedChatId)) {
    return true;
  } else {
    return false;
  }
}