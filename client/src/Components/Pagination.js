import React from "react";

const Pagination = ({ currentPage, totalPages,handlePageChange}) => {
  return (
    <nav aria-label="Table pagination">
      <ul className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
