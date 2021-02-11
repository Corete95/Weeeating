import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Posts({ posts }: any) {
  return (
    <Ul>
      <div className="title">
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
            <div className="content" key={post.id}>
              <li className="postTitle">{post.title}</li>
              <li className="postWriter">{post.writer}</li>
              <li className="postCreatedAt">{post.created_at}</li>
              <li className="postComments">{post.comments}</li>
            </div>
          </Link>
        )
      )}
    </Ul>
  );
}

const Ul = styled.ul`
  width: 90%;

  .title {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid gray;

    li {
      font-size: 1.5rem;
      margin: .3em 1em;
    }
  }
  
  .content {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid gray;

    .postTitle {
      font-size: 1rem;
      margin: 0 1em;
      line-height: 3rem;
    }

    .postWriter, .postCreatedAt, .postComments {
      font-size: 1rem;
      line-height: 3rem;
      margin: 0 1em;
    }
  }
`;
