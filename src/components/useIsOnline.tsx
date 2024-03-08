import { OnlineUsers, User } from "@/pages/api/types";

type DestructuredObj = {
  onlineUsers:OnlineUsers[];
  userIdOfOpenedChat: number;
};

export default function useIsOnline(props:DestructuredObj){
  const{onlineUsers,userIdOfOpenedChat}=props
  if (onlineUsers.find((user:OnlineUsers) => user.userId === userIdOfOpenedChat)) {
    return true;
  } else {
    return false;
  }
}