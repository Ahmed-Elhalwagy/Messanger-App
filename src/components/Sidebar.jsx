import FriendsBox from "./FriendsBox";
import NavBar from "./NavBar";
import Search from "./Search";
function Sidebar() {
  return (
    <div className="bg-indigo-800 h-full flex flex-col">
      <NavBar />
      <Search />
      <FriendsBox />
    </div>
  );
}

export default Sidebar;
