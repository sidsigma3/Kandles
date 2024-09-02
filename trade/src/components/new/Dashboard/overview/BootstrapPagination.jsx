import React from 'react';
import { Pagination } from 'react-bootstrap';

const BootstrapPagination = ({ totalTrades, tradesPerPage, currentPage, paginate }) => {
  const pageNumbers = [];

 

  for (let i = 1; i <= Math.ceil(totalTrades / tradesPerPage); i++) {
    pageNumbers.push(i);
  }



  return (
    <Pagination>
      {pageNumbers.map(number => (
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default BootstrapPagination;
