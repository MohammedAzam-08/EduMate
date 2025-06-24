import React from "react";
import clsx from "clsx";

const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyles = "rounded-md px-4 py-2 font-medium focus:outline-none transition-all";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    link: "text-blue-600 hover:underline p-0",
  };

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export { Button };
