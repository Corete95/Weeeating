import React from "react";
import { COLORS } from "../../styles/themeColor";
import styled from "styled-components";

export default function PostReply({ comments }: any) {
  return (
    <ReplyContainer>
      {comments?.map(
        (comment: {
          board_comments: any;
          comment_writer: {} | null | undefined;
          comment_content: any;
          comment_created_at: any;
        }) => (
          <div>
            <li>{comment.comment_writer}</li>
            <Bar>|</Bar>
            <li>{comment.comment_content}</li>
            <li>({comment.comment_created_at})</li>
            <Button>수정</Button>
            <Button>삭제</Button>
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
