import { useEffect, useRef } from "react";

const ChatWindow = ({ isDarkMode, messages, username }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`${
        isDarkMode ? "from-gray-800" : "from-gray-300 "
      } flex-1 overflow-y-auto p-4 bg-gradient-to-b inset-shadow-sm rounded-lg shadow-inner max-h-[80vh] mt-8 no-scrollbar`}
    >
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No messages yet. Be the first to say something!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={`${msg.username}-${msg.timestamp}`}
              className={`flex ${
                msg.username === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                  msg.username === username
                    ? isDarkMode
                      ? "bg-gray-200 text-gray-800 rounded-br-none mx-3"
                      : "bg-gray-700 text-white rounded-br-none mx-3"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-200 rounded-bl-none shadow mx-3"
                    : "bg-white text-gray-800 rounded-bl-none shadow mx-3"
                }`}
              >
                <div className="font-semibold">{msg.username}</div>
                <div className="mt-1 overflow-hidden break-words">
                  {msg.content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    msg.username === username
                      ? isDarkMode
                        ? "text-gray-500"
                        : "text-blue-100"
                      : isDarkMode
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
