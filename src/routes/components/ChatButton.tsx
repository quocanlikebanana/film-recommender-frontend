import React, { useState, useRef, useEffect } from "react";
import {
  useLazyGetLLMiNavigateQuery,
  useLazyGetLLMMoviesQuery,
} from "../content/services/movie.api";
import MovieCard from "../content/dashboard/components/MovieCard";
import { toTmdbImageUrl } from "../../app/image";

const ChatButton: React.FC = () => {
  const [isChatboxOpen, setChatboxOpen] = useState(false);
  const [getLLMMovie, { data, error, isLoading }] = useLazyGetLLMMoviesQuery();
  const [getLLMNavigate, navigateRsp] = useLazyGetLLMiNavigateQuery();
  const [messages, setMessages] = useState<
    { sender: string; message: React.ReactNode }[]
  >([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const userInputRef = useRef<HTMLInputElement>(null);

  const toggleChatbox = () => {
    setChatboxOpen(!isChatboxOpen);
  };

  const sendMessage = () => {
    if (userInputRef.current) {
      const userMessage = userInputRef.current.value.trim();
      if (userMessage) {
        setMessages([
          ...messages,
          { sender: "user", message: <p>{userMessage}</p> },
        ]);
        respondToUser(userMessage);
        userInputRef.current.value = "";
      }
    }
  };

  const sendNavigate = () => {
    if (userInputRef.current) {
      const userMessage = userInputRef.current.value.trim();
      if (userMessage) {
        setMessages([
          ...messages,
          { sender: "user", message: <p>{userMessage}</p> },
        ]);
        respondToUserNavigate(userMessage);
        userInputRef.current.value = "";
      }
    }
  };

  const respondToUser = (userMessage: string) => {
    setShouldFetch(true); // Bật cờ khi người dùng gửi tin nhắn
    getLLMMovie({ query: userMessage, page: 1, limit: 10 });
  };

  const respondToUserNavigate = (userMessage: string) => {
    setShouldFetch(true); // Bật cờ khi người dùng gửi tin nhắn
    getLLMNavigate({ query: userMessage });
  };

  useEffect(() => {
    if (shouldFetch) {
      // Chỉ gọi API khi cờ được bật
      if (isLoading) {
        setMessages((prevMessages) => {
          const loadingMessageExists = prevMessages.some(
            (msg) => msg.message === "Đang tải dữ liệu...",
          );
          if (!loadingMessageExists) {
            return [
              ...prevMessages,
              { sender: "bot", message: "Đang tải dữ liệu..." },
            ];
          }
          return prevMessages;
        });
      } else {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.message !== "Đang tải dữ liệu..."),
        );

        if (error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: "Đã xảy ra lỗi. Vui lòng thử lại sau." },
          ]);
        } else if (data?.results.length !== 0) {
          const aiMss = data?.results.map((movie) => ({
            sender: "bot",
            message: (
              <MovieCard
                movie={{
                  id: movie.id.toString(),
                  poster: toTmdbImageUrl(movie.poster_path),
                  title: movie.title,
                  rating: movie.vote_average,
                  description: movie.overview || "",
                }}
              />
            ),
          }));
          if (aiMss == undefined || aiMss.length == 0) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "bot", message: "Không tìm thấy kết quả phù hợp." },
            ]);
          } else {
            setMessages((prevMessages) => [...prevMessages, ...aiMss]);
          }
        }
        setShouldFetch(false); // Tắt cờ sau khi xử lý xong
      }
    }
  }, [data, error, isLoading, shouldFetch]);

  useEffect(() => {
    if (shouldFetch) {
      // Chỉ gọi API khi cờ được bật
      if (isLoading) {
        setMessages((prevMessages) => {
          const loadingMessageExists = prevMessages.some(
            (msg) => msg.message === "Đang tải dữ liệu...",
          );
          if (!loadingMessageExists) {
            return [
              ...prevMessages,
              { sender: "bot", message: "Đang tải dữ liệu..." },
            ];
          }
          return prevMessages;
        });
      } else {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.message !== "Đang tải dữ liệu..."),
        );

        if (error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: "Đã xảy ra lỗi. Vui lòng thử lại sau." },
          ]);
        } else if (data?.results.length !== 0) {
          // const aiMss = data?.results.map((movie) => ({
          //   sender: "bot",
          //   message: <div></div>,
          // }));
          // if (aiMss == undefined || aiMss.length == 0) {
          //   setMessages((prevMessages) => [
          //     ...prevMessages,
          //     { sender: "bot", message: "Không tìm thấy kết quả phù hợp." },
          //   ]);
          // } else {
          //   setMessages((prevMessages) => [...prevMessages, ...aiMss]);
          // }
        }
        setShouldFetch(false); // Tắt cờ sau khi xử lý xong
      }
    }
  }, [navigateRsp, shouldFetch]);

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
                <div
                  className={`rounded-lg py-2 px-4 inline-block ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              ref={userInputRef}
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
            <button
              onClick={sendNavigate}
              className="bg-emerald-400 ms-2 text-black px-4 py-2 rounded-r-md hover:bg-emerald-600 transition duration-300"
            >
              Navigate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
