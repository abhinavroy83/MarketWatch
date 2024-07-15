import React from "react";

const ConfirmationDialog = ({ onConfirm, onCancel, Heading, Para }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="text-lg font-bold">{Heading}</h2>

        <p className="mt-2 text-sm text-gray-500">{Para}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
          >
            Yes, I'm sure
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
