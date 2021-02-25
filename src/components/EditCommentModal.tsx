import React, { useEffect } from "react";
import styled from "styled-components";
import { mixin } from "../styles";

interface IProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatedComment: any;
  submitChangedComment: (crud: string, commentId: number) => void;
  updateComment: (e: any) => void;
}

interface StateForStyle {
  theLast?: boolean;
  present?: boolean;
  visible?: boolean;
}

export default function EditCommentModal({
  editModal,
  setEditModal,
  updatedComment,
  submitChangedComment,
  updateComment
}: IProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <ModalWrapper visible={editModal} tabIndex={-1}>
      {console.log("수정 모달 리로드중 content", updatedComment.content)}
      <ModalInner tabIndex={0}>
        <Input
          type="text"
          name="updatedCommentValue"
          value={updatedComment.content}
          onChange={updateComment}
          onKeyDown={(e) =>
            e.keyCode === 13 &&
            submitChangedComment("UPDATE", updatedComment.id)
          }
          maxLength={250}
        />
        <div className="buttons">
          <Button
            onClick={() => submitChangedComment("UPDATE", updatedComment.id)}
          >
            수정
          </Button>
          <Button onClick={() => setEditModal(false)}>취소</Button>
        </div>
      </ModalInner>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div<StateForStyle>`
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  display: flex;
  ${mixin.flexSet("center", "center", "column")};
  outline: none;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 25rem;
  height: 12rem;
  margin: 0 auto;
  border: 0.15rem solid ${({ theme }) => theme.black};
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.6);

  .buttons {
    width: 18rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Input = styled.input`
  display: block;
  width: 18rem;
  height: 6rem;
  text-align: top;
`;

const Button = styled.button`
  outline: none;
  font-size: 0.8em;
  font-weight: 700;
  margin-top: 0.7rem;
  cursor: pointer;
  background-color: white;
  width: 8.6rem;
  height: 1.8rem;
`;
