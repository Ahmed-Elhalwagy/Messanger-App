import { UilVideo, UilUserPlus, UilEllipsisH } from "@iconscout/react-unicons";
import { useChat } from "../context/ChatContext";
function ChatBoxNav() {
  const { data } = useChat();

  return (
    <nav className="flex justify-between items-center bg-indigo-800 h-16 p-3 text-white ">
      <div className="flex space-x-2 p-2 items-center">
        <h4>{data.user.displayName}</h4>
      </div>
      <div className="flex justify-between w-28">
        <p className="cursor-pointer">
          <UilVideo />
        </p>
        <p className="cursor-pointer">
          <UilUserPlus />
        </p>
        <p className="cursor-pointer">
          <UilEllipsisH />
        </p>
      </div>
    </nav>
  );
}

export default ChatBoxNav;
