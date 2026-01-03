

export default function MessageInput({
  message,
  setMessage,
  sendMessage
}) {
  return (
    <form
      onSubmit={sendMessage}
      className="
        sticky bottom-0
        w-full
        p-2 sm:p-3
        border-t
        bg-white
        flex items-center gap-2
        z-10
      "
    >
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          px-4 py-2.5
          text-sm
          rounded-full
          border
          bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-transparent
        "
      />

      <button
        type="submit"
        disabled={!message.trim()}
        className={`
          min-w-[44px] min-h-[44px]
          flex items-center justify-center
          rounded-full
          text-sm font-semibold
          transition
          ${
            message.trim()
              ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        ➤
      </button>
    </form>
  );
}
