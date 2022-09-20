import React from "react";
import "./Style.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className="paginationBtn"
            onClick={() => paginate(number)}
          >
            <strong>{number}</strong>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
