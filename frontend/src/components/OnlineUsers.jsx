const OnlineUsers = ({ users }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-[30vh] max-h-[auto] w-[auto] max-w-[10vw] mt-8">
      <h3 className="font-bold text-lg mb-3 text-gray-700">
        Online Users ({users.length})
      </h3>
      <div className="space-y-2">
        {users.map((user, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-2"></div>
            <span
              className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ maxWidth: "8rem", display: "inline-block" }}
              title={user}
            >
              {user}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
