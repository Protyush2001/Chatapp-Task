

import RoomsList from "./RoomsList";
import DMList from "./DMList";
import {logout} from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function Sidebar({
  user,
  rooms,
  users,
  activeRoom,
  setActiveRoom,
  setShowModal,
  navigate,
  startDM
}) {
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    localStorage.removeItem("token");
    dispatch(logout);
    navigate("/login")
  }
  return (
    <div className="w-72 md:w-80 bg-white border-r flex flex-col shadow-sm">

      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>


          <div className="truncate">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-semibold text-gray-900 truncate">
              {user.username}
            </p>
          </div>
        </div>


        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition"
          >
            + New Room
          </button>
          <button
            onClick={handleLogOut}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto px-2">

        <div className="mt-3">

          <RoomsList
            rooms={rooms.filter(r => r.isGroup)}
            activeRoom={activeRoom}
            setActiveRoom={setActiveRoom}
          />
        </div>


        <div className="mt-6 pt-4 border-t">

          <DMList
            rooms={rooms.filter(r => !r.isGroup)}
            users={users}
            activeRoom={activeRoom}
            setActiveRoom={setActiveRoom}
            userId={user._id}
            startDM={startDM}
          />
        </div>
      </div>
    </div>
  );
}
