export default function MessageInput({
  message,
  setMessage,
  sendMessage
}) {
  return (
    <form
      onSubmit={sendMessage}
      className="p-3 border-t flex gap-2"
    >
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="flex-1 border rounded px-3 py-2 text-sm"
        placeholder="Type a message..."
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 rounded text-sm"
      >
        Send
      </button>
    </form>
  );
}
