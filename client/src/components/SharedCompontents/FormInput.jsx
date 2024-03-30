import React, { forwardRef, useId } from "react";

const FormInput = forwardRef(function Input(
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
    <div className={` w-full ${parentClassName}`}>
      <div className=" flex items-center">
        {label && (
          <label
            className="text-sm font-semibold ml-4 w-[140px] font-roboto leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            className={`flex h-10 font-roboto w-[540px] text-[19px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
            id={id}
          />
          <div>
            {errorMessage && (
              <p className="mt-1 text-xs text-red-500 w-[700px]" id={id}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
});

export default FormInput;
