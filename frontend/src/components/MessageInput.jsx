import React, { useState } from "react";

const MessageInput = ({ isDarkMode, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        className={` ${
          isDarkMode
            ? "border-gray-900 bg-gray-800 shadow-2xl shadow-black text-white"
            : "border-gray-200 shadow-xl"
        } flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className={` ${
          isDarkMode
            ? "bg-gray-200 shadow-2xl shadow-black hover:bg-gray-50"
            : "bg-gray-700 shadow-xl hover:bg-gray-800"
        }  cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center transition duration-300 transform hover:scale-110`}
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill={isDarkMode ? "black" : "currentColor"}
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
