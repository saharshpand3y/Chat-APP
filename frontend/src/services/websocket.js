let socket = null;

export const connect = (url, onMessage, onOpen) => {
  return new Promise((resolve, reject) => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      if (onOpen) onOpen();
      resolve();
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (onMessage) onMessage(message);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  });
};

export const send = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("Cannot send message - WebSocket not open");
  }
};

export const disconnect = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
