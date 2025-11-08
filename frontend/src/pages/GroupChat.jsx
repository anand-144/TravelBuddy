import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SOCKET_URL = `${import.meta.env.VITE_SOCKET_URL}`;
const socket = io(SOCKET_URL, { autoConnect: false });

const GroupChat = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!groupId) return;

    const fetchGroup = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/chat/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroup(res.data);
        setMessages(res.data.messages || []);
      } catch (err) {
        toast.error("Failed to load group.");
      }
    };

    fetchGroup();

    socket.auth = { token };
    socket.connect();
    socket.emit("joinGroup", groupId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveGroup", groupId);
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const payload = {
      groupId,
      senderId: userId,
      senderName: user?.fullName || "You",
      content: input.trim(),
    };

    socket.emit("sendMessage", payload);
    setInput("");
  };

  if (!group)
    return <div className="p-6 text-center text-gray-500">Loading chat...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Solo Travelers — {group.location}
              </h2>
              <p className="text-sm text-gray-500">
                Members: {group.members?.length || 0}
              </p>
            </div>
          </div>

          <div
            ref={messagesRef}
            className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-4"
          >
            {messages.length === 0 && (
              <p className="text-gray-500 text-center text-sm">
                No messages yet. Start chatting!
              </p>
            )}

            {messages.map((m, i) => {
              const isOwn = m.sender === userId;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${
                    isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isOwn && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                      {m.senderName ? m.senderName.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs ${
                      isOwn
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <span>{m.content}</span>
                  </div>
                  {isOwn && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                      {user?.fullName?.charAt(0).toUpperCase() || "Y"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Share your thoughts or travel tips..."
            />
            <button
              onClick={sendMessage}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
