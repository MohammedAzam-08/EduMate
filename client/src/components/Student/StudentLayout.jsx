import React from "react";
import StudentSidebar from "./StudentSidebar";

const StudentLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-blue-50">
      <StudentSidebar />
      <main className="flex-1 p-6 sm:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
