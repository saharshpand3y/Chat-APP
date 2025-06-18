const OnlineUsers = ({ isDarkMode, users }) => {
  return (
    <div
      className={` ${
        isDarkMode ? "bg-gray-800 shadow-xl shadow-black" : "bg-gray-200 shadow-lg"
      } rounded-lg shadow p-4 h-[30vh] max-h-[auto] w-[auto] max-w-[10vw] mt-8`}
    >
      <h3
        className={` ${
          isDarkMode ? "text-gray-100" : "text-gray-700"
        } font-bold text-lg mb-3`}
      >
        Online Users ({users.length})
      </h3>
      <div className="space-y-2">
        {users.map((user, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-2"></div>
            <span
              className={` ${
                isDarkMode ? "text-gray-200" : "text-gray-600"
              } overflow-hidden text-ellipsis whitespace-nowrap`}
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
