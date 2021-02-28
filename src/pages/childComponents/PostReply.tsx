import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface PostReplyData {
  id: number;
  content: string;
  writer: string;
  created_at: string;
  writer_id: number;
  comments: any;
  clickEdit: (comment: any) => void;
  clickDeleteComment: (comment: any) => void;

}

export default function PostReply({
  id,
  content,
  writer,
  created_at,
  writer_id,
  comments,
  clickEdit,
  clickDeleteComment
}: 
PostReplyData) {
  const history = useHistory();

  return (
    <div className="comments" key={id}>
      <span className="commentsWriter">{writer}</span>
      <div className="commentDiv">
        <p className="commentContent">{content}</p>
        <span className="commentCreated">({created_at})</span>
        {writer_id === Number(localStorage.getItem("user_id_number")) && (
          <div className="modifyDiv">
            <p
              className="commentEdit"
              onClick={() => {
                clickEdit(comments);
              }}
            >
              수정
            </p>
            <p className="commentDelete" onClick={() => clickDeleteComment(id)}>
              삭제
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
