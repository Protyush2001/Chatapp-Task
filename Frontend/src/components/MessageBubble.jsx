export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`max-w-xs px-3 py-2 rounded text-sm ${
        isOwn
          ? "ml-auto bg-green-600 text-white"
          : "mr-auto bg-gray-200"
      }`}
    >
      {!isOwn && (
        <div className="text-xs font-semibold mb-1">
          {message.sender.username}
        </div>
      )}

      <div>{message.content}</div>

      <div className="text-[10px] text-right opacity-70 mt-1">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </div>
    </div>
  );
}
