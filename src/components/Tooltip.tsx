import React from "react";

// Tooltip Components

// Tooltip Provider Component
export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>;

// Tooltip Component
export const Tooltip: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="relative flex items-center">{children}</div>;

// Tooltip Trigger Component
export const TooltipTrigger: React.FC<{
  asChild: boolean;
  children: React.ReactNode;
}> = ({ children }) => <span>{children}</span>;

// Tooltip Content Component
export const TooltipContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="absolute bg-gray-800 text-white text-sm p-2 rounded-md shadow-md mt-2 whitespace-nowrap z-50">
    {children}
  </div>
);
