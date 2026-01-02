import MessageBubble from "./MessageBubble";
import { useEffect } from "react";

export default function Messages({
  messages,
  activeRoom,
  userId,
  loading,
  messagesEndRef
}) {
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!activeRoom) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        No chat selected
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map(msg => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isOwn={msg.sender._id === userId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
