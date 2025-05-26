import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSend, FiCornerUpLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const InstructorMessages = () => {
  const instructorEmail = localStorage.getItem("userEmail");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const instructorId = user._id;

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!instructorId) return;

    const fetchEnrolledStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/enrolled-students/${instructorId}`);
        setStudents(res.data);

        if (!selectedStudent && res.data.length > 0) {
          setSelectedStudent(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching enrolled students:", err);
      }
    };

    fetchEnrolledStudents();
  }, [instructorId]);

  useEffect(() => {
    if (!instructorEmail || !selectedStudent) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/user/${instructorEmail}`);
        setAllMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [instructorEmail]);

  useEffect(() => {
    if (!instructorEmail || !selectedStudent) return;

    const relevant = allMessages.filter(
      (msg) =>
        (msg.senderName === instructorEmail && msg.recipientName === selectedStudent.email) ||
        (msg.senderName === selectedStudent.email && msg.recipientName === instructorEmail)
    );

    setFilteredMessages(relevant);
  }, [selectedStudent, allMessages, instructorEmail]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedStudent) return;

    const messagePayload = {
      senderName: instructorEmail,
      senderRole: "instructor",
      recipientName: selectedStudent.email,
      messageText: newMessage,
    };

    try {
      await axios.post("http://localhost:5000/api/messages", messagePayload);
      const newMsg = { ...messagePayload, createdAt: new Date().toISOString() };
      setAllMessages([...allMessages, newMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Sending failed:", err);
    }
  };

  const handleReply = (email) => {
    setNewMessage(`@${email} `);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Students</h2>
        <ul className="space-y-2">
          {students.map((student, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedStudent(student)}
              className={`cursor-pointer px-3 py-2 rounded-md transition duration-200 hover:bg-blue-100 ${
                selectedStudent?.name === student.name ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {student.name}
            </motion.li>
          ))}
        </ul>
      </aside>

      {/* Chat Panel */}
      <main className="flex-1 flex flex-col p-6 bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="bg-white rounded-lg shadow-md p-5 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Chat with {selectedStudent?.name || "a student"}
          </h2>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence initial={false}>
              {filteredMessages.map((msg, index) => {
                const isInstructor = msg.senderName === instructorEmail;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`relative group max-w-md px-4 py-2 rounded-lg shadow-sm ${
                      isInstructor
                        ? "bg-blue-100 ml-auto text-right"
                        : "bg-gray-200 text-left"
                    }`}
                  >
                    <p className="text-sm">{msg.messageText}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>

                    {/* Reply Button (only for student messages) */}
                    {!isInstructor && (
                      <button
                        onClick={() => handleReply(msg.senderName)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-600 transition"
                        title="Reply"
                      >
                        <FiCornerUpLeft className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default InstructorMessages;
