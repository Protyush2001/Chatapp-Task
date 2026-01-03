import { useState } from "react";

export default function RoomsList({
  rooms,
  activeRoom,
  setActiveRoom
}) {
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-xs text-gray-500 mb-2 px-2">
        ROOMS
      </h3>


      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search rooms..."
        className="w-full mb-2 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
      />

      <div className="space-y-1">
        {filteredRooms.length === 0 && (
          <p className="text-xs text-gray-400 px-2">
            No rooms found
          </p>
        )}

        {filteredRooms.map(room => (
          <div
            key={room._id}
            onClick={() => setActiveRoom(room)}
            className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition font-semibold flex items-center gap-2
              ${activeRoom?._id === room._id
                ? "bg-green-200"
                : "hover:bg-gray-100"
              }`}
          >

            <span className="text-green-700 font-bold">👥</span>

            <span>{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
