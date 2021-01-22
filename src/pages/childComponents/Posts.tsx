import React from "react";
import styled from "styled-components";

export default function Posts({ posts, loading }: any) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Ul>
      {posts.map(
        (post: {
          id: string | number | null | undefined;
          title: React.ReactNode;
        }) => (
          <li key={post.id}>{post.id}</li>
        )
      )}
    </Ul>
  );
}

const Ul = styled.ul``;
