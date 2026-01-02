

export default function DMList({ users, userId, startDM, activeRoom }) {
  const dmUsers = users.filter(u => u._id !== userId);

  return (
    <div className="px-3 pb-3">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
        Direct Messages
      </h3>

      {dmUsers.map((u) => {
        const isActive =
          !activeRoom?.isGroup &&
          activeRoom?.users?.some(user => user._id === u._id);

        return (
          <div
            key={u._id}
            onClick={() => startDM(u._id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
          >

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {u.username.charAt(0).toUpperCase()}
            </div>


            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">
                {u.username}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}



