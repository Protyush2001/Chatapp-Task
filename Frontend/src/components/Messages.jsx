

// import MessageBubble from "./MessageBubble";
// import { useEffect } from "react";

// export default function Messages({
//   messages,
//   activeRoom,
//   userId,
//   loading,
//   messagesEndRef
// }) {
//   useEffect(() => {
//     messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);


//   if (!activeRoom) {
//     return (
//       <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
//         👋 Select a chat to start the conversation
//       </div>
//     );
//   }


//   if (loading) {
//     return (
//       <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
//         Loading messages…
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-300">
//       {messages.length === 0 && (
//         <div className="text-center text-gray-400 text-sm mt-10">
//           No messages yet. Say hi 👀
//         </div>
//       )}

//       <div className="flex flex-col gap-1">
//         {messages.map(msg => (
//           <MessageBubble
//             key={msg._id}
//             message={msg}
//             isOwn={msg.sender._id === userId}
//           />
//         ))}
//       </div>

//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

//

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
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm px-4 text-center">
        👋 Select a chat to start the conversation
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Loading messages…
      </div>
    );
  }

  return (
    <div
      className="
        flex-1 overflow-y-auto
        px-3 sm:px-4
        py-4 sm:py-6
        bg-gray-300
        overscroll-contain
      "
    >
      {messages.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-10 px-4">
          No messages yet. Say hi 👀
        </div>
      )}

      <div className="flex flex-col gap-1 sm:gap-2">
        {messages.map(msg => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.sender._id === userId}
          />
        ))}
      </div>

      {/* Scroll anchor */}
      <div ref={messagesEndRef} className="h-2" />
    </div>
  );
}

