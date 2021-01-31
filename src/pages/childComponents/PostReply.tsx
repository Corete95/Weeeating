import React from "react";
import { COLORS } from "../../styles/themeColor";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { boardAPI } from "../../config";

export default function PostReply({ comments, match }: any) {
  const history = useHistory();

  const deleteComment = (comment_id: any): void => {
    if (window.confirm("삭제?")) {
      axios
        .delete(`${boardAPI}/${match.params.id}/${comment_id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {});
    }
  };
  return (
    <ReplyContainer>
      {comments?.map(
        (comment: {
          board_comments: any;
          comment_writer: {} | null | undefined;
          comment_content: any;
          comment_created_at: any;
          comment_id: any;
        }) => (
          <div>
            <li>{comment.comment_writer}</li>
            <Bar>|</Bar>
            <li>{comment.comment_content}</li>
            <li>({comment.comment_created_at})</li>
            <Button>수정</Button>
            {console.log("댓글삭제", comment.comment_id)}
            <Button onClick={() => deleteComment(comment.comment_id)}>
              삭제
            </Button>
          </div>
        )
      )}
    </ReplyContainer>
  );
}

const ReplyContainer = styled.div`
  width: 720px;

  div {
    display: flex;
    border-bottom: 1px solid black;

    li {
      display: flex;
      align-items: center;
      margin: 0 1rem;
      height: 2rem;
      list-style: none;
      font-size: 14px;
    }
  }
`;

const Bar = styled.div`
  margin: 0;
  line-height: 2rem;
  font-size: 14px;
`;

const Button = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${COLORS.mainYellow};
`;
