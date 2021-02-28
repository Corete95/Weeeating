import React from "react";
import { useHistory } from "react-router-dom";

interface PostData {
  id: string | number | null | undefined;
  title: React.ReactNode;
  writer: string;
  created_at: string;
  comments: number;
}
export default function Posts({
  id,
  title,
  writer,
  created_at,
  comments
}: PostData) {
  const history = useHistory();
  return (
    <>
      <div
        className="listTitle"
        key={id}
        onClick={() => history.push(`/post-detail/${id}`)}
      >
        <p className="title">{title}</p>
        <p className="writer ">{writer}</p>
        <p className="createdAt">{created_at}</p>
        <p className="comments">{comments}</p>
      </div>
      <div className="listSolid"></div>
    </>
  );
}
