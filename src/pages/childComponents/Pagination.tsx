import React, { useState } from "react";
import styled from "styled-components";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage
}: any): any {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Ul>
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          prev
        </button>
        {pageNumbers.slice(0.5).map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          next
        </button>
      </Ul>
    </nav>
  );
}

const Ul = styled.ul`
  display: flex;
`;
