

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm
          ${
            isOwn
              ? "bg-green-600 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }`}
      >
        {!isOwn && (
          <div className="text-xs font-semibold text-green-700 mb-1">
            {message.sender.username}
          </div>
        )}

        <p className="leading-relaxed break-words">
          {message.content}
        </p>

        <div
          className={`text-[10px] mt-1 text-right opacity-70 ${
            isOwn ? "text-white" : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

