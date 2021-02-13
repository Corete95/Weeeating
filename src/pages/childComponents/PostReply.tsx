import React, { useState } from "react";
import { COLORS } from "../../styles/themeColor";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API } from "../../config";

interface PostReplyData {
  id: number;
  content: string;
  writer: string;
  created_at: string;
  writer_id: number;
  comments: any;
  clickEdit: (comment: any) => void;
  deleteComment: (comment_id: any) => void;
}

export default function PostReply({
  id,
  content,
  writer,
  created_at,
  writer_id,
  comments,
  clickEdit,
  deleteComment
}: PostReplyData) {
  const history = useHistory();
  console.log("text", writer);
  return (
    <div className="comments" key={id}>
      <p className="commentsWriter">{writer}</p>
      <p className="commentContent">{content}</p>
      <p className="commentCreated">({created_at})</p>
      {writer_id === Number(localStorage.getItem("user_id_number")) && (
        <div className="modifyDiv">
          <p className="commentEdit" onClick={() => clickEdit(comments)}>
            수정
          </p>
          <p className="commentDelete" onClick={() => deleteComment(id)}>
            삭제
          </p>
        </div>
      )}
    </div>
  );
}
