export default function RoomsList({ rooms, activeRoom, setActiveRoom }) {
  return (
    <div className="p-3">
      <h3 className="text-xs text-gray-500 mb-2">ROOMS</h3>

      {rooms.map(room => (
        <div
          key={room._id}
          onClick={() => setActiveRoom(room)}
          className={`p-2 rounded cursor-pointer text-sm ${
            activeRoom?._id === room._id
              ? "bg-green-100"
              : "hover:bg-gray-100"
          }`}
        >
          # {room.name}
        </div>
      ))}
    </div>
  );
}
