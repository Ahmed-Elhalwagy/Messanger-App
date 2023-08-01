/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useAuth();
  const { data } = useChat();

  console.log(message);
  return (
    <div className={`w-full flex flex-wrap align-start p-2`}>
      <div className="flex flex-row-reverse w-full gap-2">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="picccc"
          className="w-10 rounded-full"
        />
        <span
          className={`max-w-sm break-words p-4 rounded-lg text-white font-light bg-indigo-600`}
        >
          {message.text}
        </span>
      </div>
    </div>
  );
}

export default Message;
