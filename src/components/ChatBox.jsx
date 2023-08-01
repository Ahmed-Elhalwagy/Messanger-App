/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { useChat } from "../context/ChatContext";
function ChatBox() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();

  // console.log(chats);
  const [messages, setMessages] = useState([]);
  const { data } = useChat();
  console.log(data);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="h-full overflow-y-scroll">
      {messages.map((m) => {
        return <Message message={m} key={m.id} />;
      })}
    </div>
  );
}

export default ChatBox;
