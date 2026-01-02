

import { Users } from "lucide-react";

export default function RoomsList({ rooms, activeRoom, setActiveRoom }) {
  return (
    <div className="px-3">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
        Rooms
      </h3>

      {rooms.map((room) => {
        const isActive = activeRoom?._id === room._id;

        return (
          <div
            key={room._id}
            onClick={() => setActiveRoom(room)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
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


            <p className="text-sm font-medium truncate">
              {room.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}

