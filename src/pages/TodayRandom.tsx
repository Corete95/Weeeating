import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setSignupActive,
  setLoginActive,
  setFirstLogin
} from "../store/actions";
import { mixin } from "../styles";
import { API } from "../config";
import styled from "styled-components";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";

interface UserData {
  store: any;
  clickedState: boolean;
  againModal: boolean;
}

interface StateForStyle {
  visible?: boolean;
}

export default function TodayRandom() {
  const [store, setStore] = useState<UserData | any>({});
  const [clickedState, setClickedState] = useState<UserData | boolean>(false);
  const [againModal, setAgainModal] = useState(false);
  const [restTime, setRestTime] = useState({ hour: 4, minute: 0 });
  const dispatch = useDispatch();

  const display = (value: any) => {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 14400000;
    now.setTime(expireTime);

    document.cookie = `randomStore=${value};expires="${now.toUTCString()}";path=/`;
    document.cookie = `randomStoreExpireTime=${expireTime};expires=“${now.toUTCString()}“;path=/`;
  };

  const getCookie = (name: string) => {
    let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  };

  const getRandomStore = useCallback(() => {
    const store = getCookie("randomStore");

    if (!store) {
      axios
        .get(`${API}/store/list?sort=random`)
        .then((res: any) => {
          setStore(res.data.store_list.random[0]);
          setClickedState(true);
          display(JSON.stringify(res.data.store_list.random[0]));
        })
        .catch((err: any) => console.log("Catched errors!", err));
    } else {
      setStore(JSON.parse(store));
      setClickedState(true);
    }
  }, ["a"]);

  const changeLikedState = (id: any) => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${API}/store/like/${id}`, "data", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          if (res.data.MESSAGE === "NEED_USER_NAME") {
            alert("회원정보 입력 후 댓글 작성이 가능합니다.");
            dispatch(setFirstLogin(true));
            dispatch(setSignupActive(true));
          } else {
            setStore(
              store.like_state
                ? {
                    ...store,
                    like_state: !store.like_state,
                    like_count: store.like_count - 1
                  }
                : {
                    ...store,
                    like_state: !store.like_state,
                    like_count: store.like_count + 1
                  }
            );
            console.log("좋아요 통신이 완료되었습니다.", res);
          }
        })
        .catch((err) => console.log("좋아요 통신이 완료되지 않았습니다.", err));
    } else {
      alert("로그인을 해주세요!");
      dispatch(setLoginActive(true));
    }
  };

  const getAgainRandomStore = () => {
    if (getCookie("randomStore")) {
      setAgainModal(true);
    } else {
      getRandomStore();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const store = getCookie("randomStore");

    if (store) {
      setStore(JSON.parse(store));
      setClickedState(true);
    }
  }, []);

  useEffect(() => {
    let restTimer = () => {
      let expireTime = Number(getCookie("randomStoreExpireTime"));
      let nowDate = new Date();
      let nowNumber = nowDate.getTime();
      let restTime = expireTime - nowNumber;

      let hour = Math.floor((restTime / (1000 * 60 * 60)) % 24),
        minute = Math.floor((restTime / (1000 * 60)) % 60);

      setRestTime({ hour, minute });
    };
    if (againModal) {
      restTimer();
      setInterval(restTimer, 60000);
    }
  }, [againModal]);

  useEffect(() => {
    if (againModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [againModal]);

  return (
    <Container>
      <DescSection>
        <Title>이런 날도 있짜나</Title>
        <Desc>
          <p>365일 1년내내 먹고 싶은 음식이 줄줄이 소세지마냥 가득 했던 나,</p>
          <p>N년동안 살아왔지만 단 하루도 메뉴 고민을 한 적 없었던 나,</p>
          <p>·</p>
          <p>·</p>
          <p>·</p>
          <p>근데 오늘은 왜 이렇게 고민이 되는거야?</p>
          <p>내가 뭘 먹고 싶은지조차 모르겠을 때</p>
        </Desc>
      </DescSection>
      <RandomSection>
        <RandomComponent>
          {!clickedState ? (
            <Row>
              <VerticalText>무얼먹을지</VerticalText>
              <span onClick={getRandomStore}>
                <img
                  width="350rem"
                  src="https://www.clickimagination.com/wp-content/uploads/2018/06/click-logo-01.png"
                />
              </span>
              <VerticalText>고민이라면</VerticalText>
            </Row>
          ) : (
            <>
              <Row>
                <VerticalText>여기로</VerticalText>
                <StoreCard2
                  id={store.id}
                  image={store.image}
                  name={store.name}
                  likeCount={store.like_count}
                  likeState={store.like_state}
                  changeLikedState={changeLikedState}
                  type={"random"}
                />
                <VerticalText>가즈아</VerticalText>
              </Row>
              <div className="buttonSection">
                <ReplayBtn onClick={getAgainRandomStore}>다시하기</ReplayBtn>
              </div>
            </>
          )}
        </RandomComponent>
      </RandomSection>
      {againModal && (
        <ModalWrapper visible={againModal} tabIndex={-1}>
          <ModalInner tabIndex={0}>
            <div className="header">
              <Header>
                첫번째 나온 것이 찐!
                <br />이 집으로 가시죠 😋
                <div className="sub">
                  {restTime.hour}시간 {restTime.minute}분 후에 다시하기 가능
                </div>
              </Header>
            </div>
            <div className="buttons">
              <Button onClick={() => setAgainModal(false)}>먹으러가기!</Button>
            </div>
          </ModalInner>
        </ModalWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: "777Balsamtint";
  margin: 11rem auto 2rem;
  width: 65rem;
`;

const DescSection = styled.div`
  line-height: 2rem;
  letter-spacing: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
`;

const Title = styled.header`
  text-align: center;
  font-size: 2rem;
`;

const Desc = styled.p`
  margin: 2rem;
  font-size: 1.3rem;
  text-align: center;
`;

const RandomSection = styled.div``;

const RandomComponent = styled.div`
  margin: 2rem auto;
  padding: 3rem;

  .buttonSection {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
`;

const Row = styled.div`
  display: flex;
  ${mixin.flexSet("space-evenly", "center", "row")}

  img {
    cursor: pointer;
  }
`;

const VerticalText = styled.p`
  font-size: 3rem;
  writing-mode: tb-rl;
  letter-spacing: 1.2rem;
`;

const ReplayBtn = styled.span`
  border: 1px solid ${({ theme }) => theme.borderGray};
  cursor: pointer;
  background-color: ${({ theme }) => theme.mainYellow};
  font-size: 1.5rem;
  width: 7rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
    justify-content: center;
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
  line-height: 1.2em;

  .sub {
    color: ${({ theme }) => theme.buttonGray};
    font-size: 0.7em;
    padding-top: 0.5em;
  }
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
