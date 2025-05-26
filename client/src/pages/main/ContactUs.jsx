import React, { useState } from "react";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you for contacting us. We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.header
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center"
        variants={itemVariants}
      >
        <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
          Contact Us
        </motion.h1>
        <motion.p className="mt-4 text-lg md:text-xl" variants={itemVariants}>
          We'd love to hear from you! Get in touch with us for any support or queries.
        </motion.p>
      </motion.header>

      {/* Main Content Section */}
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-lg">
              If you have any questions or need support, feel free to reach out through the following:
            </p>
            <div className="mt-6">
              <p className="font-semibold">Email:</p>
              <p className="text-blue-600">edumatecdac@gmail.com</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Phone:</p>
              <p className="text-blue-600">9606776950</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Office Hours:</p>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            {status && (
              <motion.p
                className="text-green-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {status}
              </motion.p>
            )}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="name" className="font-semibold mb-2">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="email" className="font-semibold mb-2">
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              <motion.div className="flex flex-col" variants={itemVariants}>
                <label htmlFor="message" className="font-semibold mb-2">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                ></motion.textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </main>

    </motion.div>
  );
};

export default ContactUs;
