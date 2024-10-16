import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    parentClassName,
    errorMessage,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`w-full ${parentClassName}`}>
      {label && (
        <label
          className="text-[1.1rem] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`flex h-10 w-full font-['udemy-regular'] rounded-md border border-black/30 bg-transparent px-3 py-2 text-[1.1rem] placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500" id={id}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

export default Input;
