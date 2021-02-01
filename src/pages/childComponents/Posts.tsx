import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Posts({ posts }: any) {
  return (
    <Ul>
      <div>
        <li>제목</li>
        <li>작성자</li>
        <li>등록일</li>
        <li>댓글</li>
      </div>
      {posts.board_list?.map(
        (post: {
          id: string | number | null | undefined;
          title: React.ReactNode;
          writer: string;
          created_at: string;
          comments: number;
        }) => (
          <Link to={`/post-detail/${post.id}`}>
            <div key={post.id}>
              <li>{post.title}</li>
              <li>{post.writer}</li>
              <li>{post.created_at}</li>
              <li>{post.comments}</li>
            </div>
          </Link>
        )
      )}
    </Ul>
  );
}

const Ul = styled.ul`
  width: 100%;

  div {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid black;

    li {
      margin: 0 1rem;
      line-height: 2rem;
      flex: 1;
    }
  }
`;