import React, { useEffect } from "react";
import styled from "styled-components";
import { mixin } from "../styles";

interface IProps {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitChangedComment: (crud: string, commentId: number) => void;
  commentId: any;
}

interface StateForStyle {
  theLast?: boolean;
  present?: boolean;
  visible?: boolean;
}

export default function DeleteCommentModal({
  deleteModal,
  setDeleteModal,
  submitChangedComment,
  commentId
}: IProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <ModalWrapper visible={deleteModal} tabIndex={-1}>
      <ModalInner tabIndex={0}>
        <div className="header">
          <Header>삭제하시겠습니까?</Header>
        </div>
        <div className="buttons">
          <Button onClick={() => submitChangedComment("DELETE", commentId)}>
            예
          </Button>
          <Button onClick={() => setDeleteModal(false)}>아니오</Button>
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

  .header {
    width: 18rem;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.header`
  display: block;
  font-size: 1.4em;
  font-weight: 500;
  letter-spacing: 0.4rem;
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
