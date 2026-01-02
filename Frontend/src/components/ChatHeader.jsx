export default function ChatHeader({ activeRoom, userId }) {
  if (!activeRoom) {
    return (
      <div className="p-4 border-b text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  const title = activeRoom.isGroup
    ? activeRoom.name
    : activeRoom.users.find(u => u._id !== userId)?.username;

  return (
    <div className="p-4 border-b font-semibold">
      {title}
    </div>
  );
}
