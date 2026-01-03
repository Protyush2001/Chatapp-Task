

import { useState } from "react";
import { Users } from "lucide-react";

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
    <div className="px-2">
      <h3 className="text-xs text-gray-500 mb-2">
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

        {filteredRooms.map(room => {
          const isActive = activeRoom?._id === room._id;

          return (
            <div
              key={room._id}
              onClick={() => setActiveRoom(room)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-sm font-medium
                ${
                  isActive
                    ? "bg-green-100 text-green-900"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
            >

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center
                  ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "bg-green-200 text-green-700"
                  }`}
              >
                <Users size={16} />
              </div>

              <p className="truncate">
                {room.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

