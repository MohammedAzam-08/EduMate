import React, { useEffect, useState } from "react";
import axios from "axios";
import { SendIcon, MessageCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudentLayout from "../../components/Student/StudentLayout";

const StudentMessages = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentEmail = user.email;
  const studentId = user._id;

  const [enrolledInstructors, setEnrolledInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  // Fetch enrolled instructors
  useEffect(() => {
    if (!studentEmail) return;

    const fetchEnrolledInstructors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/enrolled-instructors/${studentEmail}`
        );
        setEnrolledInstructors(res.data);
        if (res.data.length > 0) {
          setSelectedInstructor(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch enrolled instructors:", err);
      }
    };

    fetchEnrolledInstructors();
  }, [studentEmail]);

  // Fetch messages
  useEffect(() => {
    if (!studentEmail) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/user/${studentEmail}`
        );
        const sortedMessages = res.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [studentEmail]);

  // Filter messages between student and selected instructor
  const filteredMessages = messages.filter(
    (msg) =>
      selectedInstructor &&
      ((msg.senderName === studentEmail &&
        msg.recipientName === selectedInstructor.email) ||
        (msg.senderName === selectedInstructor.email &&
          msg.recipientName === studentEmail))
  );

  // Handle sending message
  const handleSend = async () => {
    if (!reply.trim() || !selectedInstructor) return;

    const messagePayload = {
      senderName: studentEmail,
      senderRole: "student",
      recipientName: selectedInstructor.email,
      messageText: reply,
    };

    try {
      await axios.post("http://localhost:5000/api/messages", messagePayload);
      setMessages([
        ...messages,
        { ...messagePayload, createdAt: new Date().toISOString() },
      ]);
      setReply("");
    } catch (err) {
      console.error("Sending failed:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <StudentLayout>
      {/* Page Header */}
      <motion.div
        className="text-4xl font-extrabold text-gray-800 mb-10 flex items-center gap-3"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MessageCircleIcon className="text-indigo-600 w-8 h-8" />
        Messages
      </motion.div>

      {/* Instructor Select Dropdown */}
      <motion.div
        className="max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label
          htmlFor="instructor-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Select Instructor to Chat With:
        </label>
        <select
          id="instructor-select"
          value={selectedInstructor?.email || ""}
          onChange={(e) => {
            const instructor = enrolledInstructors.find(
              (inst) => inst.email === e.target.value
            );
            setSelectedInstructor(instructor);
          }}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
        >
          {enrolledInstructors.map((inst) => (
            <option key={inst.email} value={inst.email}>
              {inst.name || inst.email}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Chat Messages */}
      <motion.div
        className="space-y-5 mb-10 max-w-2xl mx-auto min-h-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {filteredMessages.length === 0 ? (
            <motion.p
              className="text-gray-500 text-lg text-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              No messages yet. Start the conversation!
            </motion.p>
          ) : (
            filteredMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                className={`rounded-xl px-5 py-3 shadow-md border max-w-xs md:max-w-sm ${
                  msg.senderName === studentEmail
                    ? "bg-indigo-100 ml-auto text-right"
                    : "bg-white text-left"
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <p className="text-sm text-gray-800">{msg.messageText}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Send Message Form */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Send a Message
        </h3>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-4 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your message here..."
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <SendIcon className="w-5 h-5" />
            Send Message
          </button>
        </div>
      </motion.div>
    </StudentLayout>
  );
};

export default StudentMessages;
