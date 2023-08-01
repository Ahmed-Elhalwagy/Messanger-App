import ChatBoxNav from "./ChatBoxNav";
import ChatBox from "./ChatBox";
import Input from "./Input";
import { useChat } from "../context/ChatContext";

function ChatBoxContainer() {
  const { data } = useChat();

  return (
    <div className="bg-indigo-400 h-full flex flex-col justify-between relative">
      {data.user.uid ? (
        <>
          <ChatBoxNav />
          <ChatBox />
          <Input />
        </>
      ) : (
        <h1 className="text-white font-blod text-4xl m-auto font-serif ">
          Please select a chat 👉🏻👈🏻
        </h1>
      )}
    </div>
  );
}

export default ChatBoxContainer;
