import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", errorMessage, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full md:w-1/3">
      {label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-gray-500" id={id}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

export default Input;
