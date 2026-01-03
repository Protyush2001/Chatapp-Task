

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`flex mb-2 px-1 sm:px-0 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[70%]
          px-3 sm:px-4
          py-2
          rounded-2xl
          text-sm
          shadow-sm
          break-words
          ${
            isOwn
              ? "bg-green-600 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }
        `}
      >
        {!isOwn && (
          <div className="text-xs font-semibold text-green-700 mb-1 truncate">
            {message.sender.username}
          </div>
        )}
      <div className="flex gap-5 items-center">
        <p className="leading-relaxed whitespace-pre-wrap break-words">
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
    </div>
  );
}
