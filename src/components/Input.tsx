import React from "react";

// Input Component
export const Input: React.FC<{
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  step?: string;
}> = ({ type, placeholder, value, onChange, className = "", step }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    step={step}
    className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${className}`}
  />
);
