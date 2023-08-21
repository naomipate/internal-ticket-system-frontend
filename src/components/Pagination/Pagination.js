import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import { useSearchParams } from "react-router-dom";
import { PaginationContext } from "../common/context/context";

const Pagination = () => {
  // const navigate = useNavigate();
  //{ currentPage, nextPage, previousPage, searchParams }

  const { currentPage, setCurrentPage, setIsNextPage } =
    useContext(PaginationContext);

  function handlePrev() {
    setCurrentPage(Number(currentPage) - 1);
    setIsNextPage(false);
  }
  function handleNext() {
    setCurrentPage(Number(currentPage) + 1);
    setIsNextPage(true);
  }

  return (
    <footer className="container">
      <ul className="pagination">
        <li className="page-item" id="1">
          <Link
            to={`/?page=${currentPage - 1}`}
            className="page-link"
            onClick={handlePrev}
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>

        <li className="page-item active" id="2">
          <div className="page-link">
            <span aria-hidden="true">{currentPage}</span>
          </div>
        </li>

        <li className="page-item" id="3">
          <Link
            to={`/?page=${currentPage + 1}`}
            className="page-link"
            onClick={handleNext}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Pagination;
