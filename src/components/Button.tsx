import React from "react";

// Button Component
export const Button: React.FC<{
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className = "", children }) => (
  <button
    onClick={onClick}
    className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full ${className}`}
  >
    {children}
  </button>
);
