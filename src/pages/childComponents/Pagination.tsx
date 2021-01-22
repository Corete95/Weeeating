import React from "react";
import styled from "styled-components";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate
}: any): any {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </Ul>
    </nav>
  );
}

const Ul = styled.ul`
  display: flex;
`;
