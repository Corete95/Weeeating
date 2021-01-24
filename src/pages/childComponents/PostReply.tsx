import React from "react";
import styled from "styled-components";

export default function PostReply({ posts, loading }: any) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ReplyContainer>
      <div>
        <li>이름</li>
        <li>내용</li>
        <li>날짜</li>
      </div>
      {posts.map((post: { id: {} | null | undefined }) => (
        <div>
          <li>{post.id}</li>
          <li>{post.id}</li>
          <li>{post.id}</li>
        </div>
      ))}
    </ReplyContainer>
  );
}

const ReplyContainer = styled.div`
  width: 100%;

  div {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid black;

    li {
      margin: 0 1rem;
      line-height: 2rem;
    }
  }
`;
