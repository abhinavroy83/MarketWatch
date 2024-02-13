import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className=" w-full flex justify-between m-2">
      {label && (
        <label className="text-xl text-center mb-1 pl-1 ml-auto" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`ml-2 w-8/12 justify-end rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200   ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
