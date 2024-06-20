import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const Pagination = ({ currentPage, totalRooms, roomsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex justify-center items-center">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
        >
          <FaArrowLeft /> Previous
        </button>
      )}
      <div className="flex items-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-2 border rounded-md ${
              currentPage === number
                ? "bg-white text-gray-900 border-gray-600"
                : "bg-white text-gray-500"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      {currentPage < pageNumbers.length && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="mx-2 px-4 py-2 border rounded-md flex items-center justify-center gap-2 bg-white text-gray-500 text-[17px] hover:bg-gray-300 hover:text-black"
        >
          More <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
