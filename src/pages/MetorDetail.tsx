import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosAddCircle
} from "react-icons/io";
import { mixin } from "../styles";
import { LOCALAPI } from "../config";

export default function MetorDetail() {
  const [mentorInfo, setMentorInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${LOCALAPI}/data/mentor.json`)
      .then((res: any) => setMentorInfo(res))
      .catch((err: any) => console.log("Catched Errors!! >>>", err));
  }, []);

  const TITLE = ["위코드를 이끄는", "멘토들이 뽑은 최고의 맛집"];

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>
            <p>{TITLE[0]}</p>
            <p>{TITLE[1]}</p>
          </Title>
          <Line></Line>
          <Arrow>
            <div className="left arrow">
              <IoIosArrowBack className="arrowIcon" />
            </div>
            <div className="right arrow">
              <IoIosArrowForward className="arrowIcon" />
            </div>
          </Arrow>
        </Header>
        <Body>
          <CardWrapper>
            {mentorInfo.length &&
              mentorInfo.map(
                ({ id, image, name, position, store_id, store, desc }: any) => (
                  <CardEach>
                    <Profile>
                      <img src={image} />
                      <div className="name">{name}</div>
                      <div className="position">{position}</div>
                    </Profile>
                    <Desc>
                      <div className="storeHeader">
                        <span className="decoTitle">"</span>
                        <span className="storeTitle">{store}</span>
                        <span className="decoTitle">"</span>
                      </div>
                      <div className="storeDesc">{desc}</div>
                    </Desc>
                    <MoreBtn>
                      <span className="seeStoreInfo">맛집 구경하기</span>
                      <IoIosAddCircle />
                    </MoreBtn>
                  </CardEach>
                )
              )}
          </CardWrapper>
        </Body>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.mentorBack};
`;

const Container = styled.div`
  border: 1px solid black;
  margin: 5rem auto;
  padding-top: 3rem;
  width: 65rem;
`;

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h2`
  width: 37.8rem;
  font-size: 2.5rem;
`;

const Line = styled.div`
  margin-right: 1rem;
  width: 100%;
  height: 1.25rem;
  border-top: 2px solid ${({ theme }) => theme.borderGray};
`;

const Arrow = styled.div`
  cursor: pointer;
  display: flex;

  .arrow {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #0000000d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left {
    margin-right: 0.5rem;
  }

  .right {
  }

  .arrowIcon {
    width: 50%;
    height: 50%;
    color: ${({ theme }) => theme.buttonGray};
  }
`;

const Body = styled.section``;

const CardWrapper = styled.div``;

const CardEach = styled.div`
  float: left;
  width: 33.33%;
  margin-right: 1rem;
`;

const Profile = styled.section``;

const Desc = styled.section`
  .storeHeader {
    .decoTitle {
    }
    .storeTitle {
    }
  }
`;

const MoreBtn = styled.div``;
