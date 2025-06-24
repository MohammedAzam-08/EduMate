import React from "react";
import InstructorSidebar from "./InstructorSidebar";

const InstructorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <InstructorSidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default InstructorLayout;
