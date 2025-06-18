import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import MessageInput from "./components/MessageInput.jsx";
import OnlineUsers from "./components/OnlineUsers.jsx";
import { connect, send, disconnect } from "./services/websocket.js";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const App = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connectionError, setConnectionError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [isConnected]);
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogin = async (username) => {
    setUsername(username);
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5000";

    try {
      await connect(
        wsUrl,
        (message) => {
          if (message.type === "history") {
            const sortedMessages = [...message.messages].sort(
              (a, b) => a.timestamp - b.timestamp
            );
            setMessages(sortedMessages);
          } else if (message.type === "message") {
            setMessages((prev) => [...prev, message.message]);
          } else if (message.type === "users") {
            setOnlineUsers(message.users);
          }
        },
        () => {
          setIsConnected(true);
          setTimeout(() => {
            send(JSON.stringify({ type: "join", username }));
          }, 100);
        }
      );
    } catch (error) {
      console.error("Connection failed:", error);
      setConnectionError("Failed to connect to server. Is backend running?");
    }
  };

  const handleSendMessage = (content) => {
    send(JSON.stringify({ type: "message", content }));
  };

  return (
    <>
      <div className="fixed top-8 right-20">
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="cursor-pointer"
        >
          {!isDarkMode ? <FaToggleOff size={50} /> : <FaToggleOn size={50} />}
        </button>
      </div>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
        {connectionError && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
            {connectionError}
          </div>
        )}

        {!isConnected ? (
          <Login isDarkMode={isDarkMode} onLogin={handleLogin} />
        ) : (
          <div className="flex flex-col md:flex-row flex-1 p-4 gap-4 max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:w-3/4 gap-4">
              <ChatWindow messages={messages} username={username} />
              <MessageInput onSend={handleSendMessage} />
            </div>
            <OnlineUsers users={onlineUsers} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
