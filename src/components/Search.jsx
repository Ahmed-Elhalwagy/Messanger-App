import { useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

function Search() {
  const citiesRef = collection(db, "users");
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useChat();

  const handelSearch = async () => {
    const q = query(citiesRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  function hadnelChange(e) {
    setUserName(e.target.value);
    if (e.target.value == "") setUserName("");
  }

  function handelKeyDown(e) {
    e.code === "Enter" && handelSearch();

    return function () {
      handelSearch();
    };
  }

  const handelSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    dispatch({ type: "CHANGE_USER", payload: user });
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="flex justify-start flex-col border-b-2 border-gray-800">
      <input
        onKeyDown={handelKeyDown}
        onChange={hadnelChange}
        type="text"
        placeholder="Find User"
        value={userName}
        className=" text-white p-2 shadow-md bg-transparent outline-none w-full"
      />
      {user && (
        <div
          onClick={handelSelect}
          className="w-full rounded-lg h-16 flex justify-start items-center p-4 space-x-3 hover:bg-indigo-950 cursor-pointer"
        >
          <img src={user.photoURL} className="rounded-full h-12 w-10" />
          <div className="flex flex-col items-start text-white">
            <h2>{user.displayName}</h2>
          </div>
        </div>
      )}
      {error && <></>}
    </div>
  );
}

export default Search;
