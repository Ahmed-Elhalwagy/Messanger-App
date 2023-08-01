import Sidebar from "./Sidebar";
import ChatBoxContainer from "./ChatBoxContainer";

function Home() {
  return (
    <div className="bg-white w-screen h-3/4 grid grid-cols-9 grid-rows-5 gap-0 shadow-xl shadow-indigo-500">
      <div className="col-span-4 row-span-5">
        <Sidebar />
      </div>
      <div className="col-span-5 row-span-5 col-start-5 h-full ">
        <ChatBoxContainer />
      </div>
    </div>
  );
}

export default Home;
