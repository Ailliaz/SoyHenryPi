import React from "react";
import "./Style.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const arrowLeft = "<<";
  const arrowRight = ">>";
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div className="pagination">
        {currentPage - 1 !== 0 ? (
          <button
            key="<<"
            className="paginationBtn"
            onClick={() => paginate(currentPage - 1)}
          >
            <strong>{arrowLeft}</strong>
          </button>
        ) : (
          <></>
        )}
        {pageNumbers.map((number) =>
          currentPage === number ? (
            <button
              key={number}
              className="paginationCurrentBtn"
              onClick={() => paginate(number)}
            >
              <strong>{number}</strong>
            </button>
          ) : (
            <button
              key={number}
              className="paginationBtn"
              onClick={() => paginate(number)}
            >
              <strong>{number}</strong>
            </button>
          )
        )}
        {currentPage + 1 < Math.ceil(totalPosts / postsPerPage) ? (
          <button
            key=">>"
            className="paginationBtn"
            onClick={() => paginate(currentPage + 1)}
          >
            <strong>{arrowRight}</strong>
          </button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
