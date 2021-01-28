import React from "react";
import styled from "styled-components";

interface IProps {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitChangedComment: (crud: string, commentId: number) => void;
}

interface StateForStyle {
  theLast?: boolean;
  present?: boolean;
  visible?: boolean;
}

export default function DeleteCommentModal({
  deleteModal,
  setDeleteModal,
  submitChangedComment
}: IProps) {
  return (
    <>
      <ModalWrapper visible={deleteModal} tabIndex={-1}>
        <ModalInner tabIndex={0}>
          <header>삭제하시겠습니까?</header>
          <button onClick={() => submitChangedComment("DELETE", 0)}>예</button>
          <button onClick={() => setDeleteModal(false)}>아니오</button>
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
