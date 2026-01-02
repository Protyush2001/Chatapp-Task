

export default function ChatHeader({ activeRoom, userId }) {
  if (!activeRoom) {
    return (
      <div className="h-16 px-6 flex items-center border-b bg-white text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  const isGroup = activeRoom.isGroup;
  const otherUser = !isGroup
    ? activeRoom.users.find(u => u._id !== userId)
    : null;

  return (
    <div className="h-16 px-6 flex items-center justify-between border-b bg-white shadow-sm">
  
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {isGroup
            ? activeRoom.name.charAt(0).toUpperCase()
            : otherUser?.username?.charAt(0).toUpperCase()}
        </div>

   
        <div className="leading-tight">
          <p className="font-semibold text-gray-900">
            {isGroup ? activeRoom.name : otherUser?.username}
          </p>
          <p className="text-xs text-gray-500">
            {isGroup
              ? `${activeRoom.users.length} members`
              : "Direct message"}
          </p>
        </div>
      </div>


    </div>
  );
}

