
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const SignUpPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student"; // default to student
  const { user } = useUser();
  const { clerk } = useClerk();

  useEffect(() => {
    const updateRole = async () => {
      if (user && !user.publicMetadata?.role) {
        try {
          await clerk.user.update({ publicMetadata: { role } });
        } catch (err) {
          console.error("Error updating user role:", err);
        }
      }
    };
    updateRole();
  }, [user, role, clerk]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp afterSignUpUrl="/check-role" />
    </div>
  );
};

export default SignUpPage;
