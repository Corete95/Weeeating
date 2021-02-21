import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { setSignupActive, setLoginActive } from "../store/actions";
import { mixin } from "../styles";
import { Signup, Login } from "./index";

interface IProps {
  weight: {
    storeList: boolean;
    todayRandom: boolean;
    postList: boolean;
    aboutPage: boolean;
  };
  goToPage: (path: string, page: string) => void;
}

interface StateForStyle {
  theLast?: boolean;
  present?: boolean;
  visible?: boolean;
}

export default function Nav({ weight, goToPage }: IProps) {
  const dispatch = useDispatch();
  const loggedIn =
    localStorage.getItem("isAuthenticated") === "true" ? true : false;

  const signupModal = useSelector(
    ({ setModalReducer }) => setModalReducer.signupModal
  );
  const loginModal = useSelector(
    ({ setModalReducer }) => setModalReducer.loginModal
  );

  useEffect(() => {
    if (signupModal || loginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [signupModal, loginModal]);

  const toLogout = () => {
    localStorage.clear();
    localStorage.isAuthenticated = false;
    window.location.reload();
  };

  return (
    <Container>
      <Logo onClick={() => goToPage("/", "main")}>
        <img src="./images/weeeating_Nav_logo.png" />
      </Logo>
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
        {loggedIn ? (
          <Button theLast={true} onClick={toLogout}>
            로그아웃
          </Button>
        ) : (
          <>
            <Button
              present={signupModal}
              onClick={() => dispatch(setSignupActive(true))}
            >
              회원가입
            </Button>
            <Button
              theLast={true}
              present={loginModal}
              onClick={() => dispatch(setLoginActive(true))}
            >
              로그인
            </Button>
          </>
        )}
      </ModalBtnWrapper>

      <ModalOverlay visible={signupModal || loginModal} />
      <ModalWrapper visible={signupModal || loginModal} tabIndex={-1}>
        <ModalInner tabIndex={0}>
          <CloseBtn
            onClick={() => {
              dispatch(setSignupActive(false));
              dispatch(setLoginActive(false));
            }}
          >
            <FiX className="icon" />
          </CloseBtn>
          {signupModal || !loginModal ? <Signup /> : <Login />}
        </ModalInner>
      </ModalWrapper>
    </Container>
  );
}

const Container = styled.header`
  font-family: "designhouseOTFLight00";
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

const Logo = styled.div`
  margin-right: 3rem;
  font-size: 3em;
  cursor: pointer;

  img {
    width: 228px;
    height: 63px;
  }
`;

const Button = styled.span<StateForStyle>`
  margin: 0.5em 0;
  padding: 0 1.1em;
  border-right: 0.07rem solid
    ${({ theme, theLast }) => (theLast ? theme.white : theme.borderGray)};
  font-size: 1.2em;
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
  outline: none;
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
  top: 0.5rem;
  right: 0.8rem;
  padding: 1rem;
  cursor: pointer;

  .icon {
    font-size: 1.8rem;
  }
`;
