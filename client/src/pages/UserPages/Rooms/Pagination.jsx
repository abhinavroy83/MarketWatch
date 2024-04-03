import React from "react";

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalRooms / roomsPerPage);

  // Generate page numbers
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            onClick={() => paginate(currentPage - 1)}
            href="#"
            className="page-link"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
        >
          <a
            onClick={() => paginate(currentPage + 1)}
            href="#"
            className="page-link"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
