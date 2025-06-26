import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSend, FiCornerUpLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import InstructorSidebar from "../../components/Instructor/InstructorSidebar";

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
        const res = await axios.get(
          `http://localhost:5000/api/messages/enrolled-students/${instructorId}`
        );
        setStudents(res.data);
        if (!selectedStudent && res.data.length > 0) {
          setSelectedStudent(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchEnrolledStudents();
  }, [instructorId]);

  useEffect(() => {
    if (!instructorEmail) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/user/${instructorEmail}`
        );
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
        (msg.senderName === instructorEmail &&
          msg.recipientName === selectedStudent.email) ||
        (msg.senderName === selectedStudent.email &&
          msg.recipientName === instructorEmail)
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
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-50">
      {/* Sidebar */}
      <InstructorSidebar />

      {/* Main Chat Section */}
      <main className="flex-1 flex flex-col p-6">
        {/* Header */}
        <motion.header
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-blue-800">
            Chat with {selectedStudent?.name || "a Student"}
          </h2>
          <p className="text-sm text-gray-600">
            Select a student to start the conversation.
          </p>
        </motion.header>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Sidebar - Students */}
          <motion.aside
            className="w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 overflow-y-auto"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Students</h3>
            <ul className="space-y-2">
              {students.map((student, index) => (
                <motion.li
                  key={student._id}
                  className={`cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 ${
                    selectedStudent?.email === student.email
                      ? "bg-blue-200 font-semibold text-blue-900"
                      : "text-gray-700"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedStudent(student)}
                >
                  {student.name}
                </motion.li>
              ))}
            </ul>
          </motion.aside>

          {/* Chat Box */}
          <motion.section
            className="flex-1 bg-white rounded-xl shadow-xl p-5 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <AnimatePresence initial={false}>
                {filteredMessages.map((msg, idx) => {
                  const isInstructor = msg.senderName === instructorEmail;
                  return (
                    <motion.div
                      key={idx}
                      className={`group max-w-lg px-4 py-3 rounded-xl relative text-sm shadow-md ${
                        isInstructor
                          ? "ml-auto bg-blue-100 text-right"
                          : "bg-gray-200 text-left"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{msg.messageText}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                      {!isInstructor && (
                        <button
                          onClick={() => handleReply(msg.senderName)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition text-gray-500 hover:text-blue-600"
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

            {/* Input Box */}
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default InstructorMessages;
