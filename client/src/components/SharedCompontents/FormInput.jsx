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
      <div className="flex items-center">
        {label && (
          <label
            className="text-[21px] w-[120px] font-['udemy-regular'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            className={`flex h-10 font-['udemy-regular'] w-[400px] text-[21px] rounded-md border border-black/30 bg-transparent px-3 py-2 placeholder:text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
            id={id}
          />
          <div>
            {errorMessage && (
              <p className="mt-1 text-[15px] text-red-500" id={id}>
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
