# Online Course Management System

## Project Overview
This project is a full-stack online course management system. It consists of a React-based frontend client and a Node.js/Express backend server. The system allows users to browse courses, view course details, enroll in courses, and manage enrollments.

## Project Structure
- `client/`: React frontend application
- `server/`: Node.js/Express backend API server

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine

### Backend Setup
1. Navigate to the `server` directory:
   ```
   cd online-course-management-system/server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```
   The server will start running on the configured port (default is usually 3000 or as specified in the server code).

### Frontend Setup
1. Navigate to the `client` directory:
   ```
   cd online-course-management-system/client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   This will start the React development server, usually accessible at `http://localhost:3000` or as specified in the Vite config.

## How It Works
- The frontend React app communicates with the backend API server to fetch and manage course and enrollment data.
- Users can browse available courses, view detailed information about each course, and enroll in courses.
- The backend server handles API requests, interacts with the database (if configured), and manages business logic for courses and enrollments.

## Additional Notes
- Ensure both frontend and backend servers are running simultaneously for full functionality.
- Modify configuration files as needed for database connections or environment-specific settings.














<!-- import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Import your pages and components
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignInPage from './pages/SignIn';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public SignIn route */}
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                {/* Show Navbar only when signed in */}
                <Navbar />

                {/* Inner application routes */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Routes>
              </SignedIn>

              {/* Redirect to Sign In if not logged in */}
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App; -->
