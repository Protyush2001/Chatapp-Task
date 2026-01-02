// export default function DMList({
//   rooms,
//   users,
//   activeRoom,
//   setActiveRoom,
//   userId
// }) {
//   const getOtherUser = (room) =>
//     room.users.find(u => u._id !== userId);

//   return (
//     <div className="p-3 border-t">
//       <h3 className="text-xs text-gray-500 mb-2">DIRECT MESSAGES</h3>

//       {rooms.map(room => {
//         const otherUser = getOtherUser(room);
//         if (!otherUser) return null;

//         return (
//           <div
//             key={room._id}
//             onClick={() => setActiveRoom(room)}
//             className={`p-2 rounded cursor-pointer text-sm ${
//               activeRoom?._id === room._id
//                 ? "bg-blue-100"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             {otherUser.username}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

//

export default function DMList({ rooms, users, activeRoom, setActiveRoom, userId }) {
  // Filter out logged-in user
  const dmUsers = users.filter(u => u._id !== userId);

  const handleClick = (u) => {
    // Check if a DM room already exists
    const existingRoom = rooms.find(
      r => !r.isGroup && r.users.some(user => user._id === u._id)
    );

    if (existingRoom) {
      setActiveRoom(existingRoom);
    } else {
      // You can call an API to create DM here or handle it in parent
      setActiveRoom({ users: [u, { _id: userId }], isGroup: false });
    }
  };

  return (
    <div className="p-3 border-t">
      <h3 className="text-xs text-gray-500 mb-2">DIRECT MESSAGES</h3>

      {dmUsers.map((u) => (
        <div
          key={u._id}
          onClick={() => handleClick(u)}
          className={`p-2 rounded cursor-pointer text-sm ${
            activeRoom?.users?.some(user => user._id === u._id) &&
            !activeRoom?.isGroup
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
        >
          {u.username}
        </div>
      ))}
    </div>
  );
}

