import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckRole = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const role = user.publicMetadata?.role;

    if (role === "instructor") {
      navigate("/instructor-dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/select-role"); // Redirect to role selection if missing
    }
  }, [user, navigate]);

  return <div className="p-6 text-center">Redirecting based on your role...</div>;
};

export default CheckRole;
