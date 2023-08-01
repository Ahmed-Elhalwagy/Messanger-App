import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

function NavBar() {
  const { currentUser } = useAuth();
  const { displayName, photoURL } = currentUser;
  const navigate = useNavigate();
  function handelLogout(e) {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error in logout");
        console.log(err);
      });
  }

  return (
    <div className="flex items-center justify-between p-4 text-white bg-indigo-500">
      <p className="text-md font-bold">React Messanger</p>
      <div className="flex justify-between items-center space-x-3 text-md">
        <img src={photoURL} alt="Picture" className="rounded-full w-8 h-8" />
        <span className="text-md text-white">{displayName}</span>
        <button
          className="text-sm text-white bg-indigo-400 rounded-md p-2"
          onClick={handelLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
