import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth Pages
import LoginPage from "./pages/main/LoginPage";
import RegisterPage from "./pages/main/RegisterPage";

// Role Flow
import CheckRole from "./pages/CheckRole";
import SelectRole from "./pages/SelectRole";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CourseList from "./pages/instructor/CourseList";
import AddCourse from "./pages/instructor/AddCourse";
import Enrollments from "./pages/instructor/Enrollments";
import CourseAnalytics from "./pages/instructor/CourseAnalytics";
import Messages from "./pages/instructor/Messages";
import ProfileSettings from "./pages/instructor/ProfileSettings";
import UploadMaterials from "./pages/instructor/UploadMaterials";
import CourseDetails from "./pages/instructor/CourseDetails";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAvailableCourses from "./pages/student/StudentAvailableCourses";
import StudentEnrollments from "./pages/student/StudentEnrollments";
import StudentStudyMaterials from "./pages/student/StudentStudyMaterials";
import StudentMessages from "./pages/student/StudentMessages";
import StudentProfileSettings from "./pages/student/StudentProfileSettings";
import StudentCourseDetails from "./pages/student/StudentCourseDetails";
import PaymentPage from "./pages/payment/PaymentPage";

// Main Pages
import AboutUs from "./pages/main/AboutUs";
import ContactUs from "./pages/main/ContactUs";
import LandingPage from "./pages/main/LandingPage";

// Inline ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log('ProtectedRoute token:', token);
  return token ? children : <Navigate to="/sign-in" />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Role Flow */}
          <Route path="/check-role" element={<CheckRole />} />
          <Route path="/select-role" element={<ProtectedRoute><SelectRole /></ProtectedRoute>} />

          {/* Instructor Routes */}
          <Route path="/instructor-dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
          <Route path="/instructor/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="/instructor/addcourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
          <Route path="/instructor/enrollments/:courseId" element={<ProtectedRoute><Enrollments /></ProtectedRoute>} />
          <Route path="/instructor/enrollments" element={<ProtectedRoute><Enrollments /></ProtectedRoute>} />
          <Route path="/instructor/analytics" element={<ProtectedRoute><CourseAnalytics /></ProtectedRoute>} />
          <Route path="/instructor/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/instructor/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          <Route path="/instructor/upload-material" element={<ProtectedRoute><UploadMaterials /></ProtectedRoute>} />
          <Route path="/instructor/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
         <Route path="/student/available-courses" element={<StudentAvailableCourses />} />
         <Route path="/payment" element={<PaymentPage />} />

          <Route path="/student/enrollments" element={<ProtectedRoute><StudentEnrollments /></ProtectedRoute>} />
          <Route path="/student/study-materials" element={<ProtectedRoute><StudentStudyMaterials /></ProtectedRoute>} />
          <Route path="/student/messages" element={<ProtectedRoute><StudentMessages /></ProtectedRoute>} />
          <Route path="/student/settings" element={<ProtectedRoute><StudentProfileSettings /></ProtectedRoute>} />
          <Route path="/student/courses/:id" element={<ProtectedRoute><StudentCourseDetails /></ProtectedRoute>} />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
