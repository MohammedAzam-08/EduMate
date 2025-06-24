import React, { useEffect, useState } from "react";
import axios from "axios";
import { SendIcon, MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const StudentMessages = () => {
  const studentEmail = localStorage.getItem("userEmail");
  const [instructorEmail, setInstructorEmail] = useState("instructor@example.com");

<<<<<<< HEAD
=======
import StudentLayout from "../../components/Student/StudentLayout";

const StudentMessages = () => {
  const studentEmail = localStorage.getItem("userEmail");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const studentId = user._id;

  const [enrolledInstructors, setEnrolledInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
    if (!studentId) return;

    const fetchEnrolledInstructors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/enrolled-instructors/${studentId}`);
        setEnrolledInstructors(res.data);
        if (res.data.length > 0) {
          setSelectedInstructor(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch enrolled instructors:", err);
      }
    };

    fetchEnrolledInstructors();
  }, [studentId]);

  useEffect(() => {
    if (!studentEmail) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/user/${studentEmail}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [studentEmail]);

  const filteredMessages = messages.filter(
    (msg) =>
      selectedInstructor &&
      ((msg.senderName === studentEmail && msg.recipientName === selectedInstructor.email) ||
        (msg.senderName === selectedInstructor.email && msg.recipientName === studentEmail))
  );

  const handleSend = async () => {
    if (!reply.trim() || !selectedInstructor) return;
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

    const messagePayload = {
      senderName: studentEmail,
      senderRole: "student",
<<<<<<< HEAD
<<<<<<< HEAD
      recipientName: instructorEmail,
=======
      recipientName: selectedInstructor.email,
>>>>>>> dcd67e4 (Updated stylings)
=======
      recipientName: instructorEmail,
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
=======
    <StudentLayout>
>>>>>>> dcd67e4 (Updated stylings)
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <MessageCircleIcon className="text-indigo-600 w-8 h-8" />
        Messages
      </motion.h2>

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="space-y-5 mb-10 max-w-2xl mx-auto">
        {messages.length === 0 ? (
=======
      <div className="max-w-2xl mx-auto mb-6">
        <label htmlFor="instructor-select" className="block mb-2 font-semibold text-gray-700">
          Select Instructor to Chat With:
        </label>
        <select
          id="instructor-select"
          value={selectedInstructor ? selectedInstructor.email : ""}
          onChange={(e) => {
            const instructor = enrolledInstructors.find((inst) => inst.email === e.target.value);
            setSelectedInstructor(instructor);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {enrolledInstructors.map((inst) => (
            <option key={inst.email} value={inst.email}>
              {inst.name || inst.email}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-5 mb-10 max-w-2xl mx-auto">
        {filteredMessages.length === 0 ? (
>>>>>>> dcd67e4 (Updated stylings)
=======
      <div className="space-y-5 mb-10 max-w-2xl mx-auto">
        {messages.length === 0 ? (
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
          <motion.p
            className="text-gray-500 text-lg text-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            No messages yet.
          </motion.p>
        ) : (
<<<<<<< HEAD
<<<<<<< HEAD
          messages.map((msg, idx) => (
=======
          filteredMessages.map((msg, idx) => (
>>>>>>> dcd67e4 (Updated stylings)
=======
          messages.map((msg, idx) => (
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
=======
    </StudentLayout>
>>>>>>> dcd67e4 (Updated stylings)
=======
    </div>
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
};

export default StudentMessages;
