import React, { useState } from "react";
import styled from "styled-components";
import { mixin } from "../styles";
import StoreCard2 from "./childComponents/StoreCard2";
import axios from "axios";
import { API } from "../config";

interface UserData {
  store: any;
  clickedState: boolean;
}

export default function TodayRandom() {
  const [store, setStore] = useState<UserData | any>({});
  const [clickedState, setClickedState] = useState<UserData | boolean>(false);
  const getRandomStore = () => {
    console.log("버튼 클릭됌");
    axios
      .get(`${API}/store/list?sort=random`)
      .then((res: any) => {
        console.log("res", res.data.store_list.random[0]);
        setStore(res.data.store_list.random[0]);
        setClickedState(true);
      })
      .catch((err: any) => console.log("Catched errors!", err));
  };

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
                />{" "}
                <VerticalText>가즈아</VerticalText>
              </Row>
              <div className="buttonSection">
                <ReplayBtn>다시하기</ReplayBtn>
              </div>
            </>
          )}
        </RandomComponent>
      </RandomSection>
    </Container>
  );
}

const Container = styled.div`
  margin: 11rem auto 5rem;
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
  }
`;

const Row = styled.div`
  display: flex;
  ${mixin.flexSet("space-evenly", "center", "row")}
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
