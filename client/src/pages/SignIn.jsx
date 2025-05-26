// /client/src/pages/SignIn.jsx
import React from 'react';

const SignInPage = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Sign In</h2>
      <SignIn path="/signin" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
