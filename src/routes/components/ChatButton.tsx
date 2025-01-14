import React, { useState, useRef } from "react";

const ChatButton: React.FC = () => {
  const [isChatboxOpen, setChatboxOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const userInputRef = useRef<HTMLInputElement>(null);

  const toggleChatbox = () => {
    setChatboxOpen(!isChatboxOpen);
  };

  const sendMessage = () => {
    if (userInputRef.current) {
      const userMessage = userInputRef.current.value.trim();
      if (userMessage) {
        setMessages([...messages, { sender: "user", message: userMessage }]);
        respondToUser(userMessage);
        userInputRef.current.value = "";
      }
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const respondToUser = (userMessage: string) => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: "This is a response from the chatbot." },
      ]);
    }, 500);
  };

  return (
    <div className="z-50 ">
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          onClick={toggleChatbox}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Ask AI
        </button>
      </div>
      <div
        className={`fixed bottom-16 right-4 w-1/2 ${isChatboxOpen ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-md rounded-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">AI</p>
            <button
              onClick={toggleChatbox}
              className="text-gray-300 hover:text-gray-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <p
                  className={`rounded-lg py-2 px-4 inline-block ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              ref={userInputRef}
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyUp={handleKeyUp}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
