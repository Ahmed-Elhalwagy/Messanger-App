/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handelLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(user);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="h-1/2 w-1/2 flex flex-col items-center justify-evenly bg-white rounded-lg gap-5 p-8">
      <div className="flex flex-col space-y-5">
        <h2 className="font-bold text-3xl text-blue-400">
          Welcome to React Messanger
        </h2>
        <h3 className="font-medium text-2xl ">Login</h3>
      </div>
      <form
        className="flex justify-center items-center flex-col space-y-6"
        onSubmit={handelLogin}
      >
        <input
          className="border-y-2 border-gray-300 p-2 shadow-md w-full rounded-lg outline-none focus:border-blue-400"
          type="email"
          placeholder="Email"
          required
          size={25}
        />
        <input
          className="border-y-2 border-gray-300 p-2 shadow-md w-full rounded-lg outline-none focus:border-blue-400"
          type="password"
          placeholder="Password"
          required
          size={25}
        />

        <button className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-700">
          Log in
        </button>
      </form>
      <p>
        You Do not have an Account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-400 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
