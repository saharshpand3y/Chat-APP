import { useState } from "react";

const Login = ({ isDarkMode, onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div
        className={`${
          isDarkMode
            ? "dark bg-gray-800 shadow-2xl shadow-black"
            : "bg-white shadow-xl"
        } p-8 rounded-xl w-full max-w-md`}
      >
        <h1
          className={` ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          } text-3xl font-bold text-center mb-6 `}
        >
          Welcome to <span className={`${isDarkMode ? 'text-gradient' : 'text-gradient-light'}`}>Chat</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className={` ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              } block text-sm font-medium  mb-1`}
            >
              Enter Username
            </label>
            <input
              type="text"
              id="username"
              className={` ${
                isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-gray-200"
              } w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={` ${
              isDarkMode
                ? "bg-gray-300 hover:bg-gray-100 text-gray-950"
                : "bg-gray-700 hover:bg-gray-800 text-white"
            } w-full  cursor-pointer font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105`}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
