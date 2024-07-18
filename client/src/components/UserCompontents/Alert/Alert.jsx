import React, { useState, useEffect } from "react";

function Alert({ close }) {
  const [isOpen, setIsOpen] = useState(true);
  const [remainingTime, setRemainingTime] = useState(100); 

  useEffect(() => {
    const totalTime = 5000;
    let currentTime = 0;

    const intervalId = setInterval(() => {
      currentTime += 100;
      const timeLeft = totalTime - currentTime;
      const percentageLeft = (timeLeft / totalTime) * 100;

      if (timeLeft <= 0) {
        setIsOpen(false);
        clearInterval(intervalId);
      } else {
        setRemainingTime(percentageLeft);
      }
    }, 100); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
   
  };

  if (!isOpen) return null;

  return (
    <div
      role="alert"
      className="fixed top-4 right-4 rounded-xl border border-gray-100 bg-white p-4 z-50"
    >
      <div className="flex items-center gap-4">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            Welocome! Successfully loged
          </strong>

          {/* <p className="mt-1 text-sm text-gray-700">
            Your product changes have been saved.
          </p> */}
        </div>

        <button
          onClick={handleClose}
          className="text-gray-500 transition hover:text-gray-600"
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className="absolute bottom-0 left-0 bg-green-400"
        style={{
          height: "4px",
          width: `${remainingTime}%`, // Adjusting width dynamically
          transition: "width 0.1s ease-out", // Smooth transition
        }}
      />
    </div>
  );
}

export default Alert;
