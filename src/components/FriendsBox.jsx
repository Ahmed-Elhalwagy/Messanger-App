import User from "./User";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const usersRef = collection(db, "users");

function FriendsBox() {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  useEffect(function () {
    async function fetchUsers() {
      const res = await getDocs(usersRef);
      res.docs.map((doc) => {
        if (doc.data().uid == currentUser.uid) return;
        setFriends((friends) => [...friends, doc.data()]);
      });
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start overflow-auto">
      {friends.map((friend) => {
        return <User key={friend.uid} friend={friend} />;
      })}
    </div>
  );
}

export default FriendsBox;
