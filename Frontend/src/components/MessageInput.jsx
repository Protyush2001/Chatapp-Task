

export default function MessageInput({
  message,
  setMessage,
  sendMessage
}) {
  return (
    <form
      onSubmit={sendMessage}
      className="p-3 border-t bg-white flex items-center gap-2"
    >
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          px-4 py-2
          text-sm
          rounded-full
          border
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-transparent
          bg-gray-50
        "
      />

      <button
        type="submit"
        disabled={!message.trim()}
        className={`
          px-4 py-2
          rounded-full
          text-sm
          font-semibold
          transition
          ${
            message.trim()
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        ➤
      </button>
    </form>
  );
}

