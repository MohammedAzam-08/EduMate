import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckRole = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.publicMetadata.role;
      if (role === "instructor") {
        navigate("/instructor-dashboard");
      } else if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/sign-up"); // fallback
      }
    }
  }, [user, navigate]);

  return <div className="p-6">Checking role...</div>;
};

export default CheckRole;
