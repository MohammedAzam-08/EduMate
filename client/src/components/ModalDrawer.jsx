import React from "react";

const ModalDrawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={onClose}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button onClick={onClose} className="text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalDrawer;
