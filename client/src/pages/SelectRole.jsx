import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const { user } = useUser ();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  // If user is not available, redirect to sign-in
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await user.update({
        publicMetadata: {
          role: role,
        },
      });
      navigate("/check-role");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>

        <label htmlFor="role" className="block mb-2 font-medium text-gray-700">
          I am a:
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="student">Student 🎓</option>
          <option value="instructor">Instructor 👨‍🏫</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={() => signOut(() => navigate("/sign-in"))}
          className="w-full mt-4 text-sm text-red-600 underline"
        >
          Cancel and Sign Out
        </button>
      </form>
    </div>
  );
};

export default SelectRole;