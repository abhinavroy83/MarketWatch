import React from "react";
import { RxCross1 } from "react-icons/rx";

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  Heading,
  Para,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-8 shadow-2xl relative">
        <RxCross1
          className="h-5 w-5 text-black absolute top-3 right-5 cursor-pointer hover:rotate-[360deg] transition-transform duration-300 "
          onClick={onClose}
        />
        <h2 className="text-[1.4rem] font-bold ">{Heading}</h2>

        <p className="mt-2 text-[1.1rem] text-gray-500">{Para}</p>

        <div className="mt-7 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-100 border px-6 py-2 text-[1rem] font-medium text-black"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-600 px-6 text-[1rem] font-medium text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
