import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const {itemCount,pageSize,onPageChange, currentPage} = props; 
  const pagesRequired = Math.ceil(itemCount / pageSize);
  if (pagesRequired === 1) return null;
  const pages = _.range(1, pagesRequired + 1);

  return (
    <nav aria-label="Page navigation example">
   
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className= {page === currentPage? "page-item active": "page-item"}>
            <a className = "page-link"
            onClick = {() => onPageChange(page)}
            >{page}</a>
          </li>
         ) )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = 
{
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired


}

export default Pagination;
