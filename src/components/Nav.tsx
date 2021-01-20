import React from "react";
import styled from "styled-components";
import { mixin } from "../styles";

interface IProps {
  weight: {
    storeList: boolean;
    todayRandom: boolean;
    postList: boolean;
    aboutPage: boolean;
  };
  modalActive: { signup: boolean; login: boolean };
  goToPage: (path: string, page: string) => void;
  changeModalActive: (domain: string) => void;
  closeModal: () => void;
}

interface StateForStyle {
  theLast?: boolean;
  present?: boolean;
  visible?: boolean;
}

export default function Nav({
  weight,
  modalActive,
  goToPage,
  changeModalActive,
  closeModal
}: IProps) {
  return (
    <Container>
      <Logo onClick={() => goToPage("/", "main")}>Weeeating</Logo>
      <Button
        present={weight.storeList}
        onClick={() => goToPage("/store-list", "storeList")}
      >
        맛집
      </Button>
      <Button
        present={weight.todayRandom}
        onClick={() => goToPage("/today-random", "todayRandom")}
      >
        오늘 뭐먹지?
      </Button>
      <Button
        present={weight.postList}
        onClick={() => goToPage("/post-list", "postList")}
      >
        We Moek Talk
      </Button>
      <Button
        theLast={true}
        present={weight.aboutPage}
        onClick={() => goToPage("/about", "aboutPage")}
      >
        About Weeeating
      </Button>
      <ModalBtnWrapper>
        <Button
          present={modalActive.signup}
          onClick={() => changeModalActive("signup")}
        >
          회원가입
        </Button>
        <Button
          theLast={true}
          present={modalActive.login}
          onClick={() => changeModalActive("login")}
        >
          로그인
        </Button>
      </ModalBtnWrapper>
      <ModalOverlay visible={modalActive.signup || modalActive.login} />
      <ModalWrapper
        visible={modalActive.signup || modalActive.login}
        tabIndex={-1}
      >
        <ModalInner tabIndex={0}>
          <CloseBtn onClick={closeModal}>삭제</CloseBtn>
          회원가입 or 로그인 모달창
        </ModalInner>
      </ModalWrapper>
    </Container>
  );
}

const Container = styled.header`
  ${mixin.flexSet("flex-start", "center", "row")}
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100vw;
  height: 5rem;
  padding: 0 1.3em;
  border-bottom: 0.07rem solid ${({ theme }) => theme.borderGray};
  background-color: ${({ theme }) => theme.white};
`;

const Logo = styled.span`
  margin-right: 4rem;
  font-size: 3em;
  cursor: pointer;
`;

const Button = styled.span<StateForStyle>`
  margin: 0.5em 0;
  padding: 0 1.1em;
  border-right: 0.07rem solid
    ${({ theme, theLast }) => (theLast ? theme.white : theme.borderGray)};
  font-size: 0.9em;
  font-weight: ${({ present }) => (present ? 900 : 400)};
  text-align: center;
  cursor: pointer;
`;

const ModalBtnWrapper = styled.span`
  position: absolute;
  right: 1.3rem;
`;

const ModalOverlay = styled.div<StateForStyle>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.3);
`;

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
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 37rem;
  height: 37rem;
  margin: 0 auto;
  border: 0.15rem solid ${({ theme }) => theme.black};
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.6);
`;

const CloseBtn = styled.span`
  position: absolute;
  top: 0;
  right: 1rem;
  padding: 1rem;
  cursor: pointer;
`;
