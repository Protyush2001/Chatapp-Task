

import RoomsList from "./RoomsList";
import DMList from "./DMList";

export default function Sidebar({
  user,
  rooms,
  users,
  activeRoom,
  setActiveRoom,
  setShowModal,
  navigate
}) {
  return (
    <div className="w-72 border-r bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex flex-col gap-2">
        <div className="font-semibold">{user.username}</div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-green-600 text-white text-sm py-1 rounded"
          >
            + Room
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-red-600 text-white text-sm py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto">
        {/* Group Rooms */}
        <RoomsList
          rooms={rooms.filter(r => r.isGroup)}
          activeRoom={activeRoom}
          setActiveRoom={setActiveRoom}
        />

        {/* Direct Messages */}
        <DMList
          rooms={rooms.filter(r => !r.isGroup)}
          users={users}
          activeRoom={activeRoom}
          setActiveRoom={setActiveRoom}
          userId={user._id}
        />
      </div>
    </div>
  );
}

