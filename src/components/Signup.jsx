/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/home");
          } catch (err) {
            console.log(err);
            // setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      // setErr(true);
      // setLoading(false);
    }
  };

  return (
    <div className="h-3/4 w-1/2 flex flex-col items-center justify-evenly bg-white rounded-lg gap-5 p-8">
      <div className="flex flex-col space-y-5">
        <h2 className="font-bold text-3xl text-blue-400">
          Welcome to React Messanger
        </h2>
        <h3 className="font-medium text-2xl ">Register</h3>
      </div>
      <form
        className="flex justify-center items-center flex-col space-y-6"
        onSubmit={handleSubmit}
      >
        <input
          className="border-y-2 border-gray-300 p-2 shadow-md w-full rounded-lg outline-none focus:border-blue-400"
          type="text"
          placeholder="Name"
          size={25}
        />
        <input
          className="border-y-2 border-gray-300 p-2 shadow-md w-full rounded-lg outline-none focus:border-blue-400"
          type="email"
          placeholder="Email"
          size={25}
        />
        <input
          className="border-y-2 border-gray-300 p-2 shadow-md w-full rounded-lg outline-none focus:border-blue-400"
          type="password"
          placeholder="Password"
          size={25}
        />
        <input type="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="mr-auto cursor-pointer w-full flex space-x-5 items-center"
        >
          <img src="./add-avatar.png" className="w-8 h-8" />
          <span>Add an Avatar</span>
        </label>
        <button className="h-12 px-5 m-auto w-full font-bold text-2xl text-white transition-colors duration-150 bg-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-700">
          Sign Up
        </button>
      </form>
      <p>
        You do have an Account?
        <Link to="/login" className="font-medium text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;

// const handleSubmit = async (e) => {
//   setLoading(true);
//   e.preventDefault();
//   const displayName = e.target[0].value;
//   const email = e.target[1].value;
//   const password = e.target[2].value;
//   const file = e.target[3].files[0];

//   try {
//     //Create user
//     const res = await createUserWithEmailAndPassword(auth, email, password);

//     //Create a unique image name
//     const date = new Date().getTime();
//     const storageRef = ref(storage, `${displayName + date}`);

//     await uploadBytesResumable(storageRef, file).then(() => {
//       getDownloadURL(storageRef).then(async (downloadURL) => {
//         try {
//           //Update profile
//           await updateProfile(res.user, {
//             displayName,
//             photoURL: downloadURL,
//           });
//           //create user on firestore
//           await setDoc(doc(db, "users", res.user.uid), {
//             uid: res.user.uid,
//             displayName,
//             email,
//             photoURL: downloadURL,
//           });

//           //create empty user chats on firestore
//           await setDoc(doc(db, "userChats", res.user.uid), {});
//           navigate("/");
//         } catch (err) {
//           console.log(err);
//           setErr(true);
//           setLoading(false);
//         }
//       });
//     });
//   } catch (err) {
//     setErr(true);
//     setLoading(false);
//   }
// };
