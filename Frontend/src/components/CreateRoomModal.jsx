import {useState} from "react";

export default function CreateRoomModal({
  users,
  userId,
  roomName,
  setRoomName,
  selectedUsers,
  setSelectedUsers,
  createRoom,
  onClose
}) {

  const [search,setSearch] = useState("");
  const filteredUsers = users.filter(u => u._id !== userId).filter(u => u.username.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-80">
        <h2 className="font-semibold mb-3">Create Room</h2>

        <input
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          placeholder="Room name"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search users..."
        className="w-full border px-3 py-2rounded mb-3 text-sm"
        />

        <div className="max-h-40 overflow-y-auto border rounded p-2 mb-3">
          {filteredUsers.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              No users found
            </p>
          )}

          {filteredUsers.map(u => (
            <label
              key={u._id}
              className="flex items-center gap-2 mb-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(u._id)}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedUsers(prev => [...prev, u._id]);
                  } else {
                    setSelectedUsers(prev =>
                      prev.filter(id => id !== u._id)
                    );
                  }
                }}
              />
              <span className="text-sm">{u.username}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={createRoom}
            className="flex-1 bg-green-600 text-white py-1 rounded text-sm"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
