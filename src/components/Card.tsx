import React from "react";

// Card Component
export const Card: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div
    className={`bg-white shadow-md rounded-xl p-4 max-w-md mx-auto ${className}`}
  >
    {children}
  </div>
);

// CardContent Component
export const CardContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="p-4">{children}</div>;
