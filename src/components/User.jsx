/* eslint-disable react/prop-types */

import { useChat } from "../context/ChatContext";

// eslint-disable-next-line react/prop-types
function User({ friend }) {
  const { displayName, photoURL } = friend;
  const { dispatch } = useChat();

  function handelSelect(user) {
    dispatch({ type: "CHANGE_USER", payload: user });
  }
  return (
    <div
      onClick={() => handelSelect(friend)}
      className="w-full rounded-lg h-16 flex justify-start items-center p-4 space-x-3 cursor-pointer hover:bg-indigo-950"
    >
      <img src={photoURL} className="rounded-full h-12 w-10" />
      <div className="flex flex-col items-start text-white">
        <h2>{displayName}</h2>
        <p className="text-gray-300">{}</p>
      </div>
    </div>
  );
}

export default User;
