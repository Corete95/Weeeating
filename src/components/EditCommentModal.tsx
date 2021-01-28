import React from "react";
import styled from "styled-components";

interface IProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  commentValue: string;
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
  commentValue,
  submitChangedComment,
  updateComment
}: IProps) {
  return (
    <>
      <ModalWrapper visible={editModal} tabIndex={-1}>
        <ModalInner tabIndex={0}>
          <input
            type="text"
            name="updatedCommentValue"
            value={commentValue}
            onChange={updateComment}
          />
          <button onClick={() => submitChangedComment("UPDATE", 0)}>
            수정
          </button>
          <button onClick={() => setEditModal(false)}>취소</button>
        </ModalInner>
      </ModalWrapper>
    </>
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
`;
