import React, { useEffect, useState } from "react";
import axios from "axios";
import { SendIcon, MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const StudentMessages = () => {
  const studentEmail = localStorage.getItem("userEmail");
  const [instructorEmail, setInstructorEmail] = useState("instructor@example.com");

  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (!studentEmail) return;

    axios
      .get(`http://localhost:5000/api/messages/user/${studentEmail}`)
      .then((res) => {
        const sortedMessages = res.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
      })
      .catch((err) => console.error("Failed to fetch messages:", err));
  }, [studentEmail]);

  const handleSend = async () => {
    if (!reply.trim()) return;

    const messagePayload = {
      senderName: studentEmail,
      senderRole: "student",
      recipientName: instructorEmail,
      messageText: reply,
    };

    try {
      await axios.post("http://localhost:5000/api/messages", messagePayload);
      setMessages([...messages, { ...messagePayload, createdAt: new Date().toISOString() }]);
      setReply("");
    } catch (err) {
      console.error("Sending failed:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <MessageCircleIcon className="text-indigo-600 w-8 h-8" />
        Messages
      </motion.h2>

      <div className="space-y-5 mb-10 max-w-2xl mx-auto">
        {messages.length === 0 ? (
          <motion.p
            className="text-gray-500 text-lg text-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            No messages yet.
          </motion.p>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`rounded-xl p-4 shadow-md border ${
                msg.senderName === studentEmail
                  ? "bg-indigo-100 text-right ml-auto max-w-sm"
                  : "bg-white text-left max-w-sm"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <p className="text-base text-gray-800">{msg.messageText}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))
        )}
      </div>

      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Send a Message</h3>
        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSend}
          className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <SendIcon className="w-5 h-5" />
          Send Message
        </button>
      </motion.div>
    </div>
  );
};

export default StudentMessages;
