import React from "react";

const Posts = ({ posts, loading }: any) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {posts.map(
        (post: {
          id: string | number | null | undefined;
          title: React.ReactNode;
        }) => (
          <li key={post.id}>{post.title}</li>
        )
      )}
    </ul>
  );
};

export default Posts;
