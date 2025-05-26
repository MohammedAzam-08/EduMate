import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 70 },
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const role = (data?.role || '').trim().toLowerCase();
      console.log('Login Response:', data);
      console.log('Detected Role:', role);

      // ✅ Save to localStorage
      localStorage.setItem('token', data.token || '');
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', role);
      localStorage.setItem('userName', data.name || '');
      localStorage.setItem('userEmail', data.email || '');

      // ✅ Navigate based on role
      if (role === 'student') {
        navigate('/student-dashboard');
      } else if (role === 'instructor') {
        navigate('/instructor-dashboard');
      } else {
        console.warn('Unrecognized or missing role:', role);
        setError('Unrecognized role. Please contact support.');
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-screen h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center" variants={itemVariants}>
        <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
          Welcome Back!
        </motion.h1>
        <motion.p className="mt-4 text-lg md:text-xl" variants={itemVariants}>
          Log in to continue your learning journey.
        </motion.p>
      </motion.header>

      <main className="flex-grow flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 h-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 relative overflow-hidden rounded-xl shadow-lg h-full"
          >
            <div className="z-10 max-w-lg text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Achieve More with Expert Educators
              </h1>
              <p className="text-lg text-blue-100">
                Join <span className="font-bold">10+ crore</span> learners. Prepare smart. Learn better.
              </p>
            </div>
            <img
              src="/images/education-bg.jpg"
              alt="Education"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-xl shadow-lg w-full flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                Log in to continue your learning journey
              </h2>

              <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <motion.p
                    className="text-red-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  disabled={loading}
                >
                  <span>📧</span> {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-500">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-200"
                onClick={() => {
                  window.location.href = '/api/auth/google';
                }}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5" />
                <span className="text-gray-700 font-medium">Log in with Google</span>
              </button>

              <div className="text-sm text-center mt-6 space-y-2">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <span
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate('/sign-up')}
                  >
                    Sign up
                  </span>
                </p>
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                Need help?{' '}
                <span
                  onClick={() => navigate('/contact')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Visit Help Center
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
