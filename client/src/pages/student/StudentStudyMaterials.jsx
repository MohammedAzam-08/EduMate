import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { FileTextIcon, DownloadIcon, BookOpenTextIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
=======
import { FileTextIcon, DownloadIcon, BookOpenTextIcon, ArrowLeftIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/Student/StudentLayout";
>>>>>>> dcd67e4 (Updated stylings)

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const StudentStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> dcd67e4 (Updated stylings)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    const decoded = parseJwt(token);
    if (!decoded || !decoded.id) return console.error("Invalid token");

    axios
      .get(`http://localhost:5000/api/materials/student/id/${decoded.id}`)
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7fb] via-white to-[#f1f4fa] py-12 px-6 sm:px-10">
=======
    <StudentLayout>

>>>>>>> dcd67e4 (Updated stylings)
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BookOpenTextIcon className="text-indigo-600 w-8 h-8" />
        Study Materials
      </motion.h2>

      {materials.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 text-lg mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          No study materials available yet.
        </motion.p>
      ) : (
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {materials.map((material) => (
            <motion.div
              key={material._id}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.015] hover:shadow-indigo-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {material.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-4 leading-relaxed">
                  {material.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
<<<<<<< HEAD
                {/* Highlighted course badge */}
=======
>>>>>>> dcd67e4 (Updated stylings)
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {material.courseTitle || "N/A"}
                </span>

<<<<<<< HEAD
                {/* Download link with tooltip */}
=======
>>>>>>> dcd67e4 (Updated stylings)
                <a
                  href={`http://localhost:5000/download/${material.fileUrl.split('/').pop()}`}
                  download
                  data-tooltip-id={`tooltip-${material._id}`}
                  className="group inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
                >
                  <DownloadIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-sm">Download</span>
                  <Tooltip
                    id={`tooltip-${material._id}`}
                    place="top"
                    content="Download this material"
                    className="text-xs font-medium bg-indigo-600 text-white px-2 py-1 rounded shadow"
                  />
                </a>
              </div>

<<<<<<< HEAD
              {/* Optional shimmer/overlay for shine */}
=======
>>>>>>> dcd67e4 (Updated stylings)
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      )}
<<<<<<< HEAD
    </div>
=======
    </StudentLayout>
>>>>>>> dcd67e4 (Updated stylings)
  );
};

export default StudentStudyMaterials;
